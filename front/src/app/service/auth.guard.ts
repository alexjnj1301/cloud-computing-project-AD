import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { HttpCallService } from './httpCallService'

export const AuthGuard = () => {
  const router = inject(Router)
  const authenticationService = inject(HttpCallService)
  return authenticationService.isAuthenticated() ? true : router.navigate(['/login'])
}
