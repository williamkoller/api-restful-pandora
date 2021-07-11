import { Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';

@Injectable()
export class Hasher {
  private readonly salt = Number(process.env.SALT_OR_ROUNDS);

  async hash(password: string): Promise<string> {
    return hashSync(password, this.salt);
  }
}
