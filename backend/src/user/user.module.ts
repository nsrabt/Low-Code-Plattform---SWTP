import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { users } from '../database/users';
import { user_platform } from '../database/user-platform';
import { user_platform_roles } from '../database/user-platform-roles';
import { roles } from '../database/roles';

@Module({
    imports: [
        TypeOrmModule.forFeature([users, user_platform, user_platform_roles, roles]),
    ],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}