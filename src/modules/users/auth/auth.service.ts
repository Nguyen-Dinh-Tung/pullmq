import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { AppHttpBadRequest } from 'src/exceptions/app-http.exception';
import UsersModel from 'src/database/models/users.model';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private readonly userService: UsersService,
    ) {}

    async login(userInformation: LoginDto): Promise<{ accessToken: string }> {
        const user = await this.validateUser(userInformation);
        if (!user) {
            throw new AppHttpBadRequest('Invalid credentials');
        }

        const payload = { email: user.email, sub: user.id, roles: user.roles };

        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async validateUser(userInformation: LoginDto): Promise<UsersModel> {
        const user = await this.userService.getUserByEmail(
            userInformation?.email,
        );

        if (user && user.password === userInformation.password) {
            return user;
        }

        return null;
    }
}
