import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { RouterModule, Routes } from '@nestjs/core';
import { AdminApiModule } from './admin-api.module';
import { UserApiModule } from './user-api.module';
@Module({
  imports: [
    // ThrottlerModule.forRoot({
    //   ttl: 60 * 1000, // 1 minute
    //   limit: 100,
    // }),
    CacheModule.registerAsync({
      useFactory: () => ({
        store: redisStore,
        host: 'redis-server',
        port: 6379,
        ttl: 0,
      }),
    }),
    forwardRef(() =>
      RouterModule.register([
        {
          path: 'admin',
          module: AdminApiModule,
        },
        {
          path: 'user',
          module: UserApiModule,
        },
      ]),
    ),
    forwardRef(() =>
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: [`.env.stage.${process.env.NODE_ENV}`],
        validationSchema: configValidationSchema,
      }),
    ),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mssql',
        synchronize: false, //production에서 절대로 true로 바꾸지 말 것!, 바꾸면 데이터 손실 일어남
        autoLoadEntities: false,
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        options: {
          encrypt: false,
        },
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
    }),
    forwardRef(() => AdminApiModule),
    forwardRef(() => UserApiModule),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
