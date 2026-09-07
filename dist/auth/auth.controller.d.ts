import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
}
