import { CanActivate, ExecutionContext, Injectable, Header } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log("Through Auth")
    const request = context.switchToHttp().getRequest();
    console.log()
    
    return true;
  }
}
