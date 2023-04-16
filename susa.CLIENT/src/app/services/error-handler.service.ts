import {Observable, catchError, throwError} from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {error} from "console";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error: ' + error);
        let errorMessage = this.handleError(error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

    private handleError = (error: HttpErrorResponse) : string =>
    {
      switch (error.status) {
        case 400:
          console.log(error);
          return this.handleBadRequest(error);
        // case 401:
        //   this.router.navigate(['/login']);
        //   break;
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


  private handleBadRequest = (error: HttpErrorResponse): string => {
    console.log(this.router.url)
    if (this.router.url === '/admin/register-user') {
      let message = '';
      const values = Object.values(error.error.errors);
      // @ts-ignore
      values.map((value: string): void => {
        message += value + '<br';
      });

      return message.slice(0, -4);
    } else {
      return error.error ? error.error : error.message;
    }
  }
}
