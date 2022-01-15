import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class SecretService {
  private logger = new Logger('SecretService');
  constructor(private configService: ConfigService) {}

  async generatePassword(password: string): Promise<string> {
    const full_string = this.configService.get('SALT') + password;
    const secret = await crypto
      .createHash('sha256')
      .update(full_string)
      .digest('hex');
    this.logger.log('secret in gen', secret);
    return secret;
  }

  async comparePassword(password: string, secret: string): Promise<any> {
    const full_string = this.configService.get('SALT') + password;

    const secret_compare = await crypto
      .createHash('sha256')
      .update(full_string)
      .digest('hex');

    return {
      result: secret_compare === secret,
    };
  }
}
