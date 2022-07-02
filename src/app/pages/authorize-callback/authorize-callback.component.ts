import { DialogService } from './../../shared/services/dialog.service';
import { AuthorizeCallbackService } from './authorize-callback.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-authorize-callback',
  templateUrl: './authorize-callback.component.html',
  styleUrls: ['./authorize-callback.component.scss'],
})
export class AuthorizeCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authorizeCallbackService: AuthorizeCallbackService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    if (!this.route.snapshot.queryParamMap.has('code')) {
      this.router.navigate(['/']);
      return;
    }

    const code = this.route.snapshot.queryParamMap.get('code')!;
    const state = this.route.snapshot.queryParamMap.get('state')!;

    this.authorizeCallbackService.setState(state);

    // LINE 登入
    if (state === 'login') {
      this.authorizeCallbackService.getLineAccessToken(code).subscribe({
        next: (res: any) => {
          this.authorizeCallbackService.setIdToken(res.id_token);
          this.authorizeCallbackService.setAccessToken(res.access_token);
          this.dialogService.alert({ content: '登入成功', icon: 'info' });
          this.router.navigate(['/person']);
        },
        error: () => {
          this.dialogService
            .alert({ content: 'code 失效', icon: 'info' })
            .afterClosed()
            .subscribe(() => {
              this.authorizeCallbackService.logout();
              this.router.navigate(['/login']);
            });
        },
      });
      return;
    }

    // Notify 登入
    if (state === 'notify') {
      this.authorizeCallbackService.getLineNotifyAccessToken(code).subscribe({
        next: (res: any) => {
          this.authorizeCallbackService.setAccessToken(res.access_token);
          this.dialogService.alert({ content: '登入成功', icon: 'info' });
          this.router.navigate(['/notify']);
        },
        error: () => {
          this.dialogService
            .alert({ content: 'code 失效', icon: 'info' })
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
}
