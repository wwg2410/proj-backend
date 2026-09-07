import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { CartService } from './cart.service';

// CartController защищен JWT и работает только для авторизированных пользователей.
@ApiTags('Cart')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Получить корзину текущего пользователя' })
  getCart(@CurrentUser() user: { id: number }) {
    return this.cartService.getCart(user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Добавить товар в корзину' })
  addToCart(@CurrentUser() user: { id: number }, @Body() dto: AddToCartDto) {
    return this.cartService.addToCart(user.id, dto);
  }

  @Patch(':productId')
  @ApiOperation({ summary: 'Обновить количество товара в корзине' })
  updateCartItem(
    @CurrentUser() user: { id: number },
    @Param('productId', ParseIntPipe) productId: number,
    @Body('quantity', ParseIntPipe) quantity: number,
  ) {
    return this.cartService.updateCartItem(user.id, productId, quantity);
  }

  @Delete(':productId')
  @ApiOperation({ summary: 'Удалить товар из корзины' })
  removeFromCart(
    @CurrentUser() user: { id: number },
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.cartService.removeFromCart(user.id, productId);
  }
}
