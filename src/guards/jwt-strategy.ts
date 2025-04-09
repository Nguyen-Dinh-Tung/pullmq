import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/modules/users/auth/auth.service';
import ENV from 'src/env/env.base';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: ENV.jwtSecret || 'super-secret-key',
        });
    }

    async validate(payload: any) {
        return await this.authService.validateUser(payload);
    }
}
