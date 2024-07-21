import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { SessionData } from "express-session";

@Injectable()
export class IsLoggedInGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const session: SessionData = request.session;
    if (session.isLoggedIn == true) {
      return true;
    } else {
      return false;
    }
  }
}
