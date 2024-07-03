import {Injectable} from '@nestjs/common';
import * as ldap from 'ldapjs';
import {exec} from 'child_process';
import {UserService} from "../user/user.service";
import {AddUserDto} from "../user/dto/add-user-dto";
import {users} from "../database/user & execution/users";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}
    private authenticateUser(username: string, password: string): Promise<boolean> {
        const client = ldap.createClient({
            url: 'ldaps://ldap.fh-giessen.de:636',
        });

        client.on('connect', () => {
            console.log('LDAP client connected');
        });

        client.on('error', (err) => {
            console.error('LDAP client error:', err);
        });

        console.log('Attempting to authenticate user:', username);

        const dn = `uid=${username},ou=People,ou=MNI,ou=Giessen,dc=fh-giessen-friedberg,dc=de`;

        return new Promise<boolean>((resolve, reject) => {
            client.bind(dn, password, (err) => {
                if (err) {
                    console.log('LDAP bind failed:', err);
                    resolve(false);
                } else {
                    console.log('LDAP bind successful');
                    resolve(true);
                }
                client.unbind((unbindErr) => {
                    if (unbindErr) {
                        console.log('LDAP unbind failed:', unbindErr);
                    } else {
                        console.log('LDAP unbind successful');
                    }
                });
            });
        });
    }

    private parseLdapSearchResult(output: string): any {
        // Einfaches Parsen der LDAP-Suchergebnisse
        const lines = output.split('\n');
        let user = new users();
        for (const line of lines) {
            const [key, value] = line.split(': ');
            if (key && value) {
                if (key === 'mail') user.eMail = value;
                //first name, last name should be added to fielddata
            }
        }
        if (user.eMail) {
            return user;
        }
        return null;
    }

    private ldapSearch(username: string): Promise<users> {
        return new Promise((resolve, reject) => {
            const command = `ldapsearch -H ldaps://ldap.fh-giessen.de:636 -x -b ou=Giessen,dc=fh-giessen-friedberg,dc=de "(uid=${username})"`;
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(`Error executing ldapsearch: ${error.message}`);
                    return;
                }
                if (stderr) {
                    reject(`ldapsearch stderr: ${stderr}`);
                    return;
                }
                const user = this.parseLdapSearchResult(stdout);
                if (user) {
                    resolve(user);
                } else {
                    resolve(null);
                }
            });
        });
    }

    async login(username: string, password: string) {
        if(await this.authenticateUser(username, password)) {
            const addUser = await this.ldapSearch(username);
            console.log(addUser.eMail + "  " + username)
            const addUserDto: AddUserDto = {
                eMail: addUser.eMail,
                username: username
            }
            if(addUser) {
                //Ich habe etwas geändert. Nasser braucht das User Objekt
                console.log("b")
                await this.userService.addUser(addUserDto);
                console.log("a")
                return addUser;
            }
        } else {
            console.log("not authenticated")
            return null;
        }
    }

}
