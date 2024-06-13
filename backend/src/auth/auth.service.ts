import { Injectable } from '@nestjs/common';
import * as ldap from 'ldapjs';
@Injectable()
export class AuthService {

    async authenticateUser(username: string, password: string): Promise<boolean> {
        const client = ldap.createClient({
            url: 'ldaps://ldap.fh-giessen.de:636', // Beachten Sie das ldaps und den Port 636
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
}
