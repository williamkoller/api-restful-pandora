import { LoadUserByEmailService } from '@/modules/users/services/load-user-by-email/load-user-by-email.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserInputDto } from '@/modules/auth/dtos/user-input/user-input.dto';
import { UserOutputDto } from '@/modules/auth/dtos/user-output/user-output.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/infra/db/entities/user/user-entity';
import { HashComparer } from '@/infra/cryptography/hasher-comparer/hasher-comparer';

@Injectable()
export class AuthService {
  constructor(
    private readonly loadUserByEmailService: LoadUserByEmailService,
    private readonly hashCompare: HashComparer,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * @param {UserInputDto} data
   * @return {*}  {Promise<UserOutputDto>}
   * @memberof AuthService
   */
  async validateUser(data: UserInputDto): Promise<UserOutputDto> {
    const user = await this.loadUserByEmailService.loadUserByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException('Unauthorized user.');
    }

    const validPassword = await this.hashCompare.comparer(
      data.password,
      user.password,
    );

    if (!validPassword) {
      throw new UnauthorizedException('Incorrect password or email.');
    }

    delete user.password;

    return {
      user,
      token: await this.generateJwt(user),
    };
  }

  /**
   * @param {User} user
   * @return {*}  {Promise<string>}
   * @memberof AuthService
   */
  async generateJwt(user: User): Promise<string> {
    const payload = {
      sub: user.id,
      name: user.name,
      surname: user.surname,
    };

    return this.jwtService.signAsync(payload);
  }
}
