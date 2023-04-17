import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  
  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = this.handleError(error);
        return throwError(() => new Error(errorMessage));
      })
    )
  }


   private handleError(error: HttpErrorResponse) : string{
    switch (error.status) {
      case 400:
        return this.handleBadRequest(error);
      case 401:
        return this.handleUnauthorized(error);
        break;
      // case 403:
      //   this.router.navigate(['/forbidden']);
      //   break;
      case 404:
        return this.handleNotFound(error);
        break;
      // case 500:
      //   this.router.navigate(['/server-error']);
      //   break;
      // default:
      //   this.router.navigate(['/error']);
      //   break;
    }

    return error.message;
  }

  private handleNotFound(error: HttpErrorResponse) {
  this.router.navigate(['/not-found']);
  return error.message;
}


  private handleBadRequest(error: HttpErrorResponse): string {
  
  
  if (this.router.url === '/admin/register-user' || this.router.url === '/auth/login') {
    let message = '';
    const values = Object.values(error.error.errors);
    // @ts-ignore
    values.map((m: string): void => {
      message += m + '<br>';
    });

    return message.slice(0, -4);
  } else {
    return error.error ? error.error : error.message;
  }
}

private handleUnauthorized(error: HttpErrorResponse): string {
  if (this.router.url === '/auth/login') {
    let message = '';
    const values = Object.values(error.error.errors);

    // @ts-ignore
    values.map((m: string): void => {
      message += m + '<br>';
    });

    return message.slice(0, -4);
  } else {
    return error.error ? error.error : error.message;
  }
}
}