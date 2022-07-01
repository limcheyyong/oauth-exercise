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

    this.authorizeCallbackService.getLineAccessToken(code).subscribe({
      next: (res: any) => {
        this.authorizeCallbackService.setToken(res.access_token);
        this.dialogService.alert({ content: '登入成功', icon: 'info' });
        this.router.navigate(['/']);
      },
      error: () => {
        this.dialogService
          .alert({ content: 'code 失效', icon: 'info' })
          .afterClosed()
          .subscribe(() => {
            this.router.navigate(['/login']);
          });
      },
    });
  }
}
