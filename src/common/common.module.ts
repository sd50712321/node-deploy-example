import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SecretService } from './common.secret.service';

@Module({
  imports: [forwardRef(() => ConfigModule)],
  exports: [SecretService],
  providers: [SecretService],
})
export class CommonModule {}
