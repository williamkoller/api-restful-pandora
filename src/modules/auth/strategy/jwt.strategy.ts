import { User } from '@/infra/db/entities/user/user-entity';
import { LoadUserByIdService } from '@/modules/users/services/load-user-by-id/load-user-by-id.service';
import { UserReturnType } from '@/modules/users/types/user-return/user-return.type';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly loadUserByIdService: LoadUserByIdService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  /**
   * @param {{ id: User['id'] }} payload
   * @return {*}  {Promise<UserReturnType>}
   * @memberof JwtStrategy
   */
  async validate(payload: { id: User['id'] }): Promise<UserReturnType> {
    const user = await this.loadUserByIdService.loadUserById(payload.id);
    if (!user) {
      throw new UnauthorizedException('Unauthorized user.');
    }
    return user;
  }
}
