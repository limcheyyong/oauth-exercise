import { AuthorizeCallbackService } from './../../pages/authorize-callback/authorize-callback.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ContentTypeInterceptor implements HttpInterceptor {
  constructor(private authorizeCallbackService: AuthorizeCallbackService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // if (this.authorizeCallbackService.getState() === 'login') {
    //   const newRequest = request.clone({
    //     setHeaders: {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //   });
    //   return next.handle(newRequest);
    // }

    return next.handle(request);
  }
}
