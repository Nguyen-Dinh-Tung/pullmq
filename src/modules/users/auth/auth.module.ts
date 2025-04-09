import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import ENV from 'src/env/env.base';

@Module({
    imports: [
        JwtModule.register({
            secret: ENV.jwtSecret || 'super-secret-key',
            signOptions: { expiresIn: ENV.jwtExpiresIn },
        }),
        forwardRef(() => UsersModule),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [JwtModule],
})
export class AuthModule {}
