import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

// JwtStrategy читают JWT из заголовка Authorization и проверяют токен.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET ?? 'super-secret-key-change-me',
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const user = await this.authService.validateUser(payload.sub);

    if (!user) {
      return null;
    }

    return user;
  }
}
