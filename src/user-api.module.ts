import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => ConfigModule),
    forwardRef(() => CommonModule),
    forwardRef(() =>
      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: Number(configService.get('JWT_EXPIRATION_TIME')),
            // expiresIn: 1,
          },
        }),
      }),
    ),
  ],
  exports: [],
  controllers: [AuthController],
  providers: [],
})
export class UserApiModule {}
