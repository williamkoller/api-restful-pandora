import { HasherComparer } from '@/data/protocols/criptography/hasher-comparer/hasher-comparer';
import { Hasher } from '@/data/protocols/criptography/hasher/hasher';
import { Injectable } from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';

@Injectable()
export class BcryptAdapter implements Hasher, HasherComparer {
  private salt = Number(process.env.SALT_OR_ROUNDS);
  async hash(plaintext: string): Promise<string> {
    return hashSync(plaintext, this.salt);
  }

  async compare(plaintext: string, digest: string): Promise<boolean> {
    return compareSync(plaintext, digest);
  }
}
