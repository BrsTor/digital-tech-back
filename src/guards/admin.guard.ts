import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!request.currentUser || request.currentUser.role === 'user') {
      return false;
    }
    return request.currentUser.role === 'admin';
  }
}