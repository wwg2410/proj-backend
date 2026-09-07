import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../common/current-user.decorator';
import { FavoritesService } from './favorites.service';

// FavoritesController нужен для списка понравившихся товаров.
@ApiTags('Favorites')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список избранного пользователя' })
  getFavorites(@CurrentUser() user: { id: number }) {
    return this.favoritesService.getFavorites(user.id);
  }

  @Post(':productId')
  @ApiOperation({ summary: 'Добавить товар в избранное' })
  addFavorite(
    @CurrentUser() user: { id: number },
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.favoritesService.addFavorite(user.id, productId);
  }

  @Delete(':productId')
  @ApiOperation({ summary: 'Удалить товар из избранного' })
  removeFavorite(
    @CurrentUser() user: { id: number },
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.favoritesService.removeFavorite(user.id, productId);
  }
}
