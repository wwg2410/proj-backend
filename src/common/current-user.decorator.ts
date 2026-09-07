import { createParamDecorator, ExecutionContext } from '@nestjs/common';

type AuthenticatedUser = {
  id: number;
  email: string;
  name: string;
};

// CurrentUser позволяет получить данные авторизованного пользователя из request.
export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<{ user?: AuthenticatedUser }>();

    return request.user;
  },
);
