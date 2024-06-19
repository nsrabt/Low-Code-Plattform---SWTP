import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UserModule} from "../user/user.module";
import {AuthController} from "./auth.controller";



@Module({
  imports: [UserModule],// Füge das UserModule hier hinzu
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}