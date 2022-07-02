import { environment } from 'src/environments/environment';
import { AuthorizeCallbackService } from './../authorize-callback/authorize-callback.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(
    private http: HttpClient,
    private authorizeCallbackService: AuthorizeCallbackService
  ) {}

  /**
   * 取得 Line Access Token 狀態
   */
  getLineVerify(): Observable<any> {
    const body = new URLSearchParams();
    body.set('id_token', this.authorizeCallbackService.getIdToken() ?? '');
    body.set('client_id', environment.clientIdLineLogin);

    // 轉換資料格式
    return this.http.post('/v2.1/verify', body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }

  /**
   * 取消訂閱功能
   */
  revoke(): Observable<any> {
    const body = new URLSearchParams();
    body.set(
      'access_token',
      this.authorizeCallbackService.getAccessToken() ?? ''
    );
    body.set('client_id', environment.clientIdLineLogin);
    body.set('client_secret', environment.clientSecretLineLogin);

    return this.http.post<any>('/v2.1/revoke', body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }

  /**
   * 取消訂閱功能
   */
  revokeNotify(): Observable<any> {
    return this.http.post<any>(
      '/api/revoke',
      {},
      {
        headers: {
          Authorization: `Bearer ${this.authorizeCallbackService.getNotifyAccessToken()}`,
        },
      }
    );
  }
}
