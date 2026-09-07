import { Injectable } from '@nestjs/common';

// AppService хранит стартовую бизнес-логику приложения.
// В небольшом проекте здесь удобно держать общие приветственные ответы и мета-информацию.
@Injectable()
export class AppService {
  getHello(): string {
    return 'Phone Store API is ready';
  }
}
