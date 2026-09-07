import { Product } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
export declare class PhonesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
    create(createPhoneDto: CreatePhoneDto): Promise<Product>;
    update(id: number, updatePhoneDto: UpdatePhoneDto): Promise<Product>;
    remove(id: number): Promise<Product>;
    validateStock(phoneId: number, quantity: number): Promise<Product>;
}
