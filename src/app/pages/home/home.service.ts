import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  /**
   * 取得 Line Access Token 狀態
   */
  getNotifyStatus(): Observable<any> {
    return this.http.get<any>('/api/status');
  }

  /**
   * 發送通知
   */
  notice(message: string): Observable<any> {
    const formData = new FormData();
    formData.append('message', message);

    return this.http.post('/api/notify', formData);
  }

  /**
   * 取消訂閱功能
   */
  revoke(): Observable<any> {
    return this.http.post<any>('/api/revoke', {});
  }
}
