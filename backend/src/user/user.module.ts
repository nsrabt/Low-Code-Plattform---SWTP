import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { user } from '../database/user';
import { user_platform } from '../database/user-platform';
import { user_platform_roles } from '../database/user-platform-roles';
import { roles } from '../database/roles';

@Module({
    imports: [
        TypeOrmModule.forFeature([user, user_platform, user_platform_roles, roles]),
    ],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}