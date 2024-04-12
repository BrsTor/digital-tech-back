import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Injectable,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private usersService: UsersService) { }

    async intercept(context: ExecutionContext, handler: CallHandler) {
        //Retieve the request from the context
        const request = context.switchToHttp().getRequest();

        //Check for current cookie-session active and retrieve userId
        const { userId } = request.session || {};

        if (userId) {
            //Rerieve the user by the userId
            const user = await this.usersService.findOneById(userId);

            //Store the current user in the request
            request.currentUser = user;
        }

        return handler.handle();
    }
}
