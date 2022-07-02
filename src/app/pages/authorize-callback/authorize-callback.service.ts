import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthorizeCallbackService {
  constructor(private http: HttpClient) {}

  setIdToken(token: string): void {
    sessionStorage.setItem('id_token', token);
  }

  getIdToken(): string | null {
    if (sessionStorage.getItem('id_token')) {
      return sessionStorage.getItem('id_token');
    }
    return null;
  }

  setAccessToken(token: string): void {
    sessionStorage.setItem('access_token', token);
  }

  getAccessToken(): string | null {
    if (sessionStorage.getItem('access_token')) {
      return sessionStorage.getItem('access_token');
    }
    return null;
  }

  setState(state: string): void {
    sessionStorage.setItem('state', state);
  }

  getState(): string | null {
    if (sessionStorage.getItem('state')) {
      return sessionStorage.getItem('state');
    }
    return null;
  }

  /**
   * 取得 Notify Access Token
   */
  getLineNotifyAccessToken(code: string): Observable<unknown> {
    const formData = new FormData();
    formData.append('grant_type', 'authorization_code');
    formData.append('code', code);
    formData.append('redirect_uri', `${location.origin}/authorize-callback`);
    formData.append('client_id', environment.clientIdNotify);
    formData.append('client_secret', environment.clientSecretNotify);
    return this.http.post(`/oauth/token`, formData);
  }

  /**
   * 取得 Access Token
   */
  getLineAccessToken(code: string): Observable<unknown> {
    const body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('code', code);
    body.set('redirect_uri', `${location.origin}/authorize-callback`);
    body.set('client_id', environment.clientIdLineLogin);
    body.set('client_secret', environment.clientSecretLineLogin);
    return this.http.post('/v2.1/token', body.toString());
  }

  /**
   * 登出
   */
  logout(): void {
    sessionStorage.clear();
  }
}
