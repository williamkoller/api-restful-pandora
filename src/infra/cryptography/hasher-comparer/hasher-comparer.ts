import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';

@Injectable()
export class HashComparer {
  /**
   * @param {string} password
   * @param {string} hash
   * @return {*}  {Promise<boolean>}
   * @memberof HashComparer
   */
  async comparer(password: string, hash: string): Promise<boolean> {
    return compareSync(password, hash);
  }
}
