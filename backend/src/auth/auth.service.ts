import { Injectable } from '@nestjs/common';
import * as ldap from 'ldapjs';
import { exec } from 'child_process';
import { UserService } from "../user/user.service";
import { AddUserDto } from "../user/dto/add-user-dto";
import { users } from "../database/user & execution/users";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {
    }
    private createLdapClient(): ldap.Client {
        const client = ldap.createClient({
            url: 'ldaps://ldap.fh-giessen.de:636',
        });

        client.on('connect', () => {
            console.log('LDAP client connected');
        });

        client.on('error', (err) => {
            console.error('LDAP client error:', err);
        });

        return client;
    }

    private closeLdapClient(client: ldap.Client) {
        client.unbind((err) => {
            if (err) {
                console.error('Error unbinding LDAP client:', err);
            } else {
                console.log('LDAP client unbound successfully');
            }
        });
    }

    private authenticateUser(username: string, password: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const client = this.createLdapClient();
            const dn = `uid=${username},ou=People,ou=MNI,ou=Giessen,dc=fh-giessen-friedberg,dc=de`;
            console.log('Attempting to authenticate user:', username);

            client.bind(dn, password, (err) => {
                if (err) {
                    console.log('LDAP bind failed:', err);
                    this.closeLdapClient(client);
                    resolve(false);
                } else {
                    console.log('LDAP bind successful');
                    this.closeLdapClient(client);
                    resolve(true);
                }
            });
        });
    }

    private parseLdapSearchResult(output: string): users | null {
        // Einfaches Parsen der LDAP-Suchergebnisse
        const lines = output.split('\n');
        let user = new users();
        for (const line of lines) {
            const [key, value] = line.split(': ');
            if (key && value) {
                if (key === 'mail') user.eMail = value;
                if(key === 'displayName') user.username = value;
                if(key === 'uid') user.name = value;
                // first name, last name should be added to fielddata
            }
        }
        if (user.eMail) {
            return user;
        }
        return null;
    }

    private ldapSearch(username: string): Promise<users | null> {
        return new Promise((resolve, reject) => {
            const command = `ldapsearch -H ldaps://ldap.fh-giessen.de:636 -x -b ou=Giessen,dc=fh-giessen-friedberg,dc=de "(uid=${username})"`;
            const startTime = Date.now();
            const child = exec(command, { timeout: 10000 }, (error, stdout, stderr) => {
                const endTime = Date.now();
                console.log(`ldapsearch took ${endTime - startTime}ms`);

                if (error) {
                    if (error.killed) {
                        reject(new Error('ldapsearch timed out'));
                    } else {
                        reject(new Error(`Error executing ldapsearch: ${error.message}`));
                    }

                    return;
                }
                if (stderr) {
                    reject(new Error(`ldapsearch stderr: ${stderr}`));
                    return;
                }
                const user = this.parseLdapSearchResult(stdout);
                resolve(user);
            });
            child.on('error', (err) => {
                reject(new Error(`ldapsearch process error: ${err.message}`));
            });
            child.on('exit', (code) => {
                if (code !== 0) {
                    reject(new Error(`ldapsearch exited with code: ${code}`));
                }
            });
        });
    }

    async login(username: string, password: string) {
        if (await this.authenticateUser(username, password)) {
            const addUser = await this.ldapSearch(username);
            if (addUser) {

                console.log(`${addUser.eMail}  ${addUser.username}`);
                const newUser = await this.userService.addUser({
                    username: addUser.username,
                    eMail: addUser.eMail,
                    name: addUser.name
                });
                console.log("new",newUser);
                return newUser;
            }
        } else {
            console.log("not authenticated");
            return null;
        }
    }
}