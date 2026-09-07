import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { PhonesService } from './phones.service';
export declare class PhonesController {
    private readonly phonesService;
    constructor(phonesService: PhonesService);
    findAll(): Promise<{
        description: string;
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string;
        price: number;
        stock: number;
        memoryGb: number;
        color: string;
    }[]>;
    findOne(id: number): Promise<{
        description: string;
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string;
        price: number;
        stock: number;
        memoryGb: number;
        color: string;
    }>;
    create(createPhoneDto: CreatePhoneDto): Promise<{
        description: string;
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string;
        price: number;
        stock: number;
        memoryGb: number;
        color: string;
    }>;
    update(id: number, updatePhoneDto: UpdatePhoneDto): Promise<{
        description: string;
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string;
        price: number;
        stock: number;
        memoryGb: number;
        color: string;
    }>;
    remove(id: number): Promise<{
        description: string;
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        brand: string;
        price: number;
        stock: number;
        memoryGb: number;
        color: string;
    }>;
}
