import { Injectable } from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class Hasher {
  /**
   * @param {string} password
   * @return {*}  {Promise<string>}
   * @memberof Hasher
   */
  async hash(password: string): Promise<string> {
    const salt = genSaltSync();
    return hashSync(password, salt);
  }
}
