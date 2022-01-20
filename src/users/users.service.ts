import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { User } from './users.entity';
import { UsersRepository } from './users.repository';
import { UserRegistDto } from './dto/user_regist.dto';
import { generatePassword } from 'src/utils/password';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private configService: ConfigService,
  ) {}

  private logger = new Logger('UsersService', { timestamp: true });

  async registUser(userRegistDto: UserRegistDto): Promise<void> {
    const { user_id, password } = userRegistDto;
    const userChk = await this.usersRepository.getUserByUserId(user_id);
    this.logger.log('userChk', userChk);
    if (userChk) {
      throw new BadRequestException('이미 존재하는 아이디입니다.');
    }
    const encryptedPassword = await generatePassword(
      password,
      this.configService.get('SALT'),
    );
    const result = await this.usersRepository.createUser(
      new User({
        ...userRegistDto,
        password: encryptedPassword,
      }),
    );
  }

  async getUserByUserId(user_id: string): Promise<User> {
    const result = await this.usersRepository.getUserByUserId(user_id);
    return result;
  }
}
