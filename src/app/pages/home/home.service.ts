import { AuthorizeCallbackService } from '../authorize-callback/authorize-callback.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(
    private http: HttpClient,
    private authorizeCallbackService: AuthorizeCallbackService
  ) {}

  /**
   * 取得 Line Access Token 狀態
   */
  getLineAccessToken(): Observable<any> {
    return this.http.get<any>('/api/status', {
      headers: {
        Authorization: `Bearer ${this.authorizeCallbackService.getToken()}`,
      },
    });
  }

  notice(message: string): Observable<any> {
    const formData = new FormData();
    formData.append('message', message);

    return this.http.post('/api/notify', formData, {
      headers: {
        Authorization: `Bearer ${this.authorizeCallbackService.getToken()}`,
      },
    });
  }
}
