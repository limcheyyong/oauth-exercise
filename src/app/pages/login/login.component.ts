import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  login(): void {
    let URL = 'https://notify-bot.line.me/oauth/authorize?';
    URL += 'response_type=code';
    URL += `&client_id=${environment.clientId}`;
    URL += `&redirect_uri=${location.origin}/authorize-callback`;
    URL += '&scope=notify';
    URL += '&state=NO_STATE';
    window.location.href = URL;
  }
}
