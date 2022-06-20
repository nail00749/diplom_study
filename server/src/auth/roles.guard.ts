import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { Role } from './Roles';

const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const { user } = request;
      return user.role === role;
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
