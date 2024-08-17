import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authservice = inject(AuthService);

  const router = inject(Router)

  if(authservice.isAuthenticated()){
     return true;
  }
  else{
    router.navigate(['/']);
      return false;
  }
};
