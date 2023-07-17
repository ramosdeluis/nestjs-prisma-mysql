import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';

export const User = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const user = request.user;

    if (user) {
      if (filter) {
        return request.user[filter];
      } else {
        return request.user;
      }
    } else {
      throw new NotFoundException(
        'User not found in the request. Use the AuthGuard to get the user.',
      );
    }
  },
);
