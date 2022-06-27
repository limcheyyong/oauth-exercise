import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';
import { AuthorizeCallbackService } from '../authorize-callback/authorize-callback.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user$ = new Subject<any>();
  form = new FormGroup({
    message: new FormControl(''),
  });

  constructor(
    private homeService: HomeService,
    private authorizeCallbackService: AuthorizeCallbackService
  ) {}

  ngOnInit(): void {
    this.homeService.getLineAccessToken().subscribe((data) => {
      console.log(data);
      this.user$.next(data);
    });
  }

  notice(): void {
    this.homeService
      .notice(this.form.get('message')?.value)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
