import { CanActivate, ExecutionContext, Injectable, Response, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext ): boolean | Promise<boolean> | Observable<boolean> 
  {
    const request = context.switchToHttp().getRequest<Request>();
    
    if(!request.headers.authorization){
      throw new UnauthorizedException()
    }

    return true;
  }
}
