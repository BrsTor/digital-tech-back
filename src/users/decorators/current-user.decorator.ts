import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        //Retieve the request from the context
        const request = context.switchToHttp().getRequest();

        //Retieve the current user from the request
        return request.currentUser;
    },
);
