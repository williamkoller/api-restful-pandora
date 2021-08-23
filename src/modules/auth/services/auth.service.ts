import { LoadUserByEmailService } from '@/modules/users/services/load-user-by-email/load-user-by-email.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserInputDto } from '@/modules/auth/dtos/user-input/user-input.dto';
import { UserOutputDto } from '@/modules/auth/dtos/user-output/user-output.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/infra/db/entities/user/user-entity';
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import { PayloadType } from '@/modules/auth/types/payload/payload.type';

type VerifyTokenType = {
  id: string;
  name: string;
  surname: string;
  iat: Date;
  exp: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly loadUserByEmailService: LoadUserByEmailService,
    private readonly bcryptAdapter: BcryptAdapter,
    private readonly jwtService: JwtService,
    private readonly userRepo: UserRepository,
  ) {}

  /**
   * @param {UserInputDto} data
   * @return {*}  {Promise<UserOutputDto>}
   * @memberof AuthService
   */
  public async validateUser(data: UserInputDto): Promise<UserOutputDto> {
    const user = await this.loadUserByEmailService.loadUserByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException('Unauthorized user.');
    }

    const isValid = await this.bcryptAdapter.compare(
      data.password,
      user.password,
    );

    await this.userRepo.lastLogged(user.id, new Date());

    if (!isValid) {
      throw new UnauthorizedException('Incorrect password or email.');
    }

    const token = await this.generateJwt(user);

    const verifyToken = await this.verifyJwt(token);

    if (user.id !== verifyToken.id) {
      throw new UnauthorizedException('Invalid Token.');
    }

    delete user.password;

    return {
      user,
      token,
    };
  }

  /**
   * @param {User} user
   * @return {*}  {Promise<string>}
   * @memberof AuthService
   */
  public async generateJwt(user: User): Promise<string> {
    const payload: PayloadType = {
      id: user.id,
      name: user.name,
      surname: user.surname,
    };

    return this.jwtService.signAsync(payload);
  }

  /**
   * @param {string} token
   * @return {*}  {Promise<string[]>}
   * @memberof AuthService
   */
  public async verifyJwt(token: string): Promise<VerifyTokenType> {
    return this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
