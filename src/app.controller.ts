import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

// Контроллер корневого маршрута.
// Он принимает запрос на '/' и отдает стартовую информацию по API.
@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Получить стартовое сообщение API' })
  getHello(): string {
    return this.appService.getHello();
  }
}
