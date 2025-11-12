// src/common/guards/roles.guard.ts
import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { ROLES_KEY } from '../../decorators/roles.decorator';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) return true;
  
      const { user } = context.switchToHttp().getRequest();
    //   console.log('User en RolesGuard:', user);
    if (!user || !requiredRoles.includes(user.role)) {
        throw new ForbiddenException(`Access denied for role: ${user?.role || 'undefined'}`);
      }
  
      return true;
    }
  }
  