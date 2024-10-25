import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { first, Observable, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authSvc: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('Interceptor chiamato con URL:', request.url);
    if (
      request.url.includes('auth/login') ||
      request.url.includes('auth/register')
    ) {
      console.log('Richiesta di autenticazione, non aggiungo token.');
      return next.handle(request);
    }

    return this.authSvc.authSubject$.pipe(
      first(),
      switchMap((accessData) => {
        if (!accessData) {
          console.log('Nessun accessData, invio la richiesta senza token.');
          return next.handle(request);
        }

        const newRequest = request.clone({
          headers: request.headers.append(
            'Authorization',
            `Bearer ${accessData.accessToken}`
          ),
        });

        console.log('Token aggiunto alla richiesta:', newRequest);
        return next.handle(newRequest);
      })
    );
  }
}
