import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  private readonly SALT_OR_ROUNDS = 10;

  encodePassword(password: string): string {
    return bcrypt.hashSync(password, this.SALT_OR_ROUNDS);
  }

  comparePassword(plainPassword: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }
}
