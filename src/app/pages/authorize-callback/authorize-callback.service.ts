import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthorizeCallbackService {
  constructor(private http: HttpClient) {}

  setToken(token: string): void {
    sessionStorage.setItem('access_token', token);
  }
  getToken(): string | null {
    if (sessionStorage.getItem('access_token')) {
      return sessionStorage.getItem('access_token');
    }
    return null;
  }

  getLineAccessToken(code: string): Observable<unknown> {
    const formData = new FormData();
    formData.append('grant_type', 'authorization_code');
    formData.append('code', code);
    formData.append('redirect_uri', `${location.origin}/authorize-callback`);
    formData.append('client_id', environment.clientId);
    formData.append('client_secret', environment.dummyClientSecret);

    return this.http.post(`/oauth/token`, formData);
  }

  /**
   * 登出
   */
  logout(): void {
    sessionStorage.removeItem('access_token');
  }
}
