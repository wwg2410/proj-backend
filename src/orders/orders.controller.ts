import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/current-user.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

// Контроллер заказов отвечает за входящие HTTP-запросы.
// В реальном магазине здесь обычно еще добавляют авторизацию и проверку ролей.
@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все заказы' })
  @ApiResponse({ status: 200, description: 'Список заказов' })
  findAll() {
    return this.ordersService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Создать заказ' })
  @ApiResponse({ status: 201, description: 'Заказ успешно создан' })
  create(
    @CurrentUser() user: { id: number },
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.create(createOrderDto, user.id);
  }
}
