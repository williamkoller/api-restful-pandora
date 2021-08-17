import { LoadUserByRoleService } from '@/modules/roles/services/load-user-by-role/load-user-by-role.service';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly loadUserByRoleService: LoadUserByRoleService,
  ) {}

  /**
   * @param {ExecutionContext} context
   * @return {*}  {Promise<boolean>}
   * @memberof PermissionsGuard
   */
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    if (!permissions) {
      return true;
    }

    const { users, headers } = context.switchToHttp().getRequest<Request>();

    if (!users) {
      throw new BadRequestException(
        'The property the user of the request is not correctly named or undefined.',
      );
    }
    const role = headers['x-role'];

    if (!role) {
      throw new BadRequestException('Role must be informed');
    }

    const loadUserByRole = await this.loadUserByRoleService.loadUserByRole(
      users.id,
    );

    const hasRole = (): string =>
      loadUserByRole.find((roles) => roles === role);

    const hasPermission = (): string =>
      permissions.find((per) => per === hasRole());

    if (hasPermission() && hasRole()) return true;

    throw new ForbiddenException(
      'Role does not have permissions to access this endpoint',
    );
  }
}
