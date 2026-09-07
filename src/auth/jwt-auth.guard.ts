import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// JwtAuthGuard защищает endpoints, для которых нужен токен пользователя.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
