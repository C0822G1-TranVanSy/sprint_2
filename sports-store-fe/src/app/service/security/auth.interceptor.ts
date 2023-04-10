import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenStorageService} from './token-storage.service';
export const InterceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenStorageService: TokenStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authRequest = request;
    let token = this.tokenStorageService.getToken();

    if (authRequest.headers.has(InterceptorSkipHeader)) {
      const headers = request.headers.delete(InterceptorSkipHeader);
      return next.handle(authRequest.clone({ headers }));
    }
    if (token != null) {
      authRequest = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + token)})
    }

    return next.handle(authRequest);
  }
}
