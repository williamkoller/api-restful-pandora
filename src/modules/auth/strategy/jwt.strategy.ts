import { User } from '@/infra/typeorm/entities/user/user-entity';
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

  async validate(payload: {
    sub: User['id'];
    name: string;
  }): Promise<UserReturnType> {
    const user = await this.loadUserByIdService.loadUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Unauthorized user.');
    }
    return user;
  }
}
