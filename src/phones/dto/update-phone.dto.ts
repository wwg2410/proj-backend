import { PartialType } from '@nestjs/swagger';
import { CreatePhoneDto } from './create-phone.dto';

// PartialType автоматически делает все поля необязательными.
// Это удобно для обновления товара по PATCH запросу.
export class UpdatePhoneDto extends PartialType(CreatePhoneDto) {}
