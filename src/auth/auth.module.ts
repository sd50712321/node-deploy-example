import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CommonModule } from 'src/common/common.module';
// import { UserModule } from 'src/tg/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth-guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // forwardRef(() =>
    //   JwtModule.registerAsync({
    //     imports: [ConfigModule],
    //     inject: [ConfigService],
    //     useFactory: async (configService: ConfigService) => ({
    //       secret: configService.get('JWT_SECRET'),
    //       signOptions: {
    //         expiresIn: Number(configService.get('JWT_EXPIRATION_TIME')),
    //         // expiresIn: 60 * 60,
    //       },
    //     }),
    //   }),
    // ),
    // forwardRef(() => UserModule),
    forwardRef(() => CommonModule),
    // UserModule,
    // CommonModule,
  ],
  exports: [JwtStrategy, PassportModule, JwtAuthGuard],
  controllers: [],
  providers: [JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}
