import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        //Retieve the request from the context
        const request = context.switchToHttp().getRequest();

        //If the userId doesn't exist in the session of the request it means it cannot Activate
        if (!request.session.userId) {
            return false
        }

        //If the userId exist in the session of the request it means it canActivate and give access to the Guard
        return true;
    }
}
