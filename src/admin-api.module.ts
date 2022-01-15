import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

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
export class AdminApiModule {}
