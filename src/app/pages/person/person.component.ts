import { Router } from '@angular/router';
import { AuthorizeCallbackService } from './../authorize-callback/authorize-callback.service';
import { DialogService } from './../../shared/services/dialog.service';
import { PersonService } from './person.service';
import { Component, OnInit } from '@angular/core';
import { EMPTY, iif, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {
  user$ = new Subject<any>();

  constructor(
    private personService: PersonService,
    private dialogService: DialogService,
    private authorizeCallbackService: AuthorizeCallbackService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.personService.getLineVerify().subscribe((data) => {
      this.user$.next(data);
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
