import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(dto: SignUpDto): Promise<{
        message: string;
        user: {
            id: number;
            email: string;
            name: string;
        };
        accessToken: string;
    }>;
    login(dto: SignInDto): Promise<{
        message: string;
        user: {
            id: number;
            email: string;
            name: string;
        };
        accessToken: string;
    }>;
    validateUser(userId: number): Promise<{
        id: number;
        email: string;
        name: string;
    } | null>;
    private generateToken;
}
