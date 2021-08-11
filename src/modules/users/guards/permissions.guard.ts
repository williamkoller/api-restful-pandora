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
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    if (!permissions) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const role = request.headers['x-role'];

    if (!role) {
      throw new BadRequestException('Role must be informed');
    }

    if (permissions[0] === role) {
      return true;
    }

    throw new ForbiddenException();
  }
}
