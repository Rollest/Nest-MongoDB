import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: IUser): Promise<{
        id: string;
        email: string;
        token: string;
    }>;
}
