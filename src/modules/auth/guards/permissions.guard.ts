import { LoadUserByRoleService } from '@/modules/roles/services/load-user-by-role/load-user-by-role.service';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly loadUserByRoleService: LoadUserByRoleService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    if (!permissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const role = request.headers['x-role'];

    if (!role) {
      throw new BadRequestException('Role must be informed');
    }

    const loadUserByRole = await this.loadUserByRoleService.findUserByRole(
      user.id,
    );

    const hasRole = () =>
      loadUserByRole.find((roles) => roles.toString() === role.toString());

    if (hasRole()) {
      return true;
    }

    throw new ForbiddenException();
  }
}
