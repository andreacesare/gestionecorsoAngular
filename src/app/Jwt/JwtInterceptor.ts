import {inject, Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {catchError, EMPTY, Observable} from 'rxjs';
import {Router} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private route = inject(Router);
  private snack = inject(MatSnackBar);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');


    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            console.warn("Token scaduto");
            this.snack.open("La sessione è scaduta", 'ok',
              {duration: 5000,
              horizontalPosition:'center',
                verticalPosition:'top',
              })
            localStorage.removeItem('token');
            this.route.navigate(['login']);
          }
          return EMPTY;
        }
      ));
  }
}
