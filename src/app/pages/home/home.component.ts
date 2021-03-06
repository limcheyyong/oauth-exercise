import { Router } from '@angular/router';
import { DialogService } from '../../shared/services/dialog.service';
import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';
import { AuthorizeCallbackService } from '../authorize-callback/authorize-callback.service';
import { FormControl, FormGroup } from '@angular/forms';
import { EMPTY, iif, Subject, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  form = new FormGroup({
    message: new FormControl(''),
  });

  constructor(
    private homeService: HomeService,
    private authorizeCallbackService: AuthorizeCallbackService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  notice(): void {
    this.homeService
      .notice(this.form.get('message')?.value)
      .pipe(
        switchMap(() =>
          this.dialogService
            .alert({ content: '發送成功', icon: 'check' })
            .afterClosed()
        )
      )
      .subscribe(() => {
        this.form.reset();
      });
  }

  exit(): void {
    this.dialogService
      .alert({ content: '確定退出？', showCancel: true })
      .afterClosed()
      .pipe(
        switchMap((data) => iif(() => data, of(true), EMPTY)),
        tap(() => this.authorizeCallbackService.logout()),
        switchMap(() => this.dialogService.alert({ content: '' }).afterClosed())
      )
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}
