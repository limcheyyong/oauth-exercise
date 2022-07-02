import { AuthorizeCallbackService } from './../../pages/authorize-callback/authorize-callback.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authorizeCallbackService: AuthorizeCallbackService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    
    if (this.authorizeCallbackService.getAccessToken()) {
      if (this.authorizeCallbackService.getState() === 'notify') {
        const newRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.authorizeCallbackService.getAccessToken()}`,
          },
        });
        return next.handle(newRequest);
      }
    }
    return next.handle(request);
  }
}
