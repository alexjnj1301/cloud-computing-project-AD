import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { Router } from '@angular/router'
import { Constants } from '../constants'
import { environment } from '../environments/environment'

export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const constants: Constants = new Constants()
  const router: Router = new Router()
  const token = sessionStorage.getItem(constants.TOKEN_KEY)

  if (req.url.startsWith(`${environment.apiUrl}/api`)) {
    const clonedRequest = token
      ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        }
      }) : req

    return next(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          router.navigate(['/error/' + error.status])
        }
        return throwError(() => error)
      })
    )
  } else {
    return next(req)
  }
}
