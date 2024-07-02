import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { users } from '../database/user & execution/users';
import { user_platform } from '../database/user & execution/user-platform';
import { user_platform_roles } from '../database/user & execution/user-roles';
import { roles } from '../database/workflow/roles';

@Module({
    imports: [
        TypeOrmModule.forFeature([users, user_platform, user_platform_roles, roles]),
    ],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}