import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { PhonesService } from './phones.service';

// Контроллер принимает HTTP-запросы и направляет их в сервис.
// Это стандартный паттерн в NestJS: Controller -> Service -> Data Layer.
@ApiTags('Phones')
@Controller('phones')
export class PhonesController {
  constructor(private readonly phonesService: PhonesService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список всех телефонов' })
  @ApiResponse({
    status: 200,
    description: 'Успешный ответ со списком телефонов',
  })
  findAll() {
    return this.phonesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить один телефон по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID телефона' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.phonesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создать новый телефон' })
  @ApiResponse({ status: 201, description: 'Телефон успешно создан' })
  create(@Body() createPhoneDto: CreatePhoneDto) {
    return this.phonesService.create(createPhoneDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить описание телефона' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePhoneDto: UpdatePhoneDto,
  ) {
    return this.phonesService.update(id, updatePhoneDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить телефон из каталога' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.phonesService.remove(id);
  }
}
