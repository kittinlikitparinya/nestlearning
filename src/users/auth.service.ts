import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    // done see if email is use
    const users = await this.userService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }
    // done hash user password

    // done generate salt
    const salt = randomBytes(8).toString('hex');

    //  done hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // done Join hashed password and hashed salt together
    const result = salt + '.' + hash.toString('hex');

    // done create new user and save it
    const user = await this.userService.create(email, result);

    // done wreturn user
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = await user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (hash.toString('hex') !== storedHash) {
      throw new BadRequestException('bad password');
    }
    console.log('hi i am signin runing');
    console.log(user);
    if (user.email) {
      return  user ;
    }
  }


}
