import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizeCallbackService } from './../authorize-callback/authorize-callback.service';
import { DialogService } from './../../shared/services/dialog.service';
import { PersonService } from './person.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, EMPTY, iif, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {
  user$ = new Subject<any>();
  isConnected = !!this.authorizeCallbackService.getNotifyAccessToken();
  constructor(
    private personService: PersonService,
    private dialogService: DialogService,
    private authorizeCallbackService: AuthorizeCallbackService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code')!;
    const state = this.route.snapshot.queryParamMap.get('state')!;

    this.personService.getLineVerify().subscribe((data) => {
      this.user$.next(data);
    });

    // 取得 Notify 的 access token
    if (
      state === 'notify' &&
      !this.authorizeCallbackService.getNotifyAccessToken()
    ) {
      this.authorizeCallbackService.getLineNotifyAccessToken(code).subscribe({
        next: (res: any) => {
          this.authorizeCallbackService.setNotifyAccessToken(res.access_token);
          this.isConnected = true;
          this.dialogService.alert({ content: '綁定成功', icon: 'info' });
        },
        error: () => {
          this.dialogService
            .alert({ content: 'code 失效1', icon: 'info' })
            .afterClosed()
            .subscribe(() => {
              this.authorizeCallbackService.logout();
              this.router.navigate(['/login']);
            });
        },
      });
      return;
    }
  }

  notifyLogin(): void {
    let URL = 'https://notify-bot.line.me/oauth/authorize?';
    URL += 'response_type=code';
    URL += `&client_id=${environment.clientIdNotify}`;
    URL += `&redirect_uri=${location.origin}/person`;
    URL += '&scope=notify';
    URL += '&state=notify';
    window.location.href = URL;
  }

  notifyRevoke(): void {
    this.dialogService
      .alert({ content: '確定取消綁定？', showCancel: true })
      .afterClosed()
      .pipe(
        switchMap((data) =>
          iif(() => data, this.personService.revokeNotify(), EMPTY)
        ),
        tap(() => localStorage.removeItem('access_token_notify')),
        switchMap(() =>
          this.dialogService.alert({ content: '註銷成功' }).afterClosed()
        )
      )
      .subscribe(() => {
        this.isConnected = false;
      });
  }

  exit(): void {
    this.dialogService
      .alert({ content: '確定退出？', showCancel: true })
      .afterClosed()
      .pipe(
        switchMap((data) =>
          iif(() => data, this.personService.revoke(), EMPTY)
        ),
        tap(() => this.authorizeCallbackService.logout()),
        switchMap(() =>
          this.dialogService.alert({ content: '註銷成功' }).afterClosed()
        )
      )
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}
