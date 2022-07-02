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
  notifyLogin(): void {
    let URL = 'https://notify-bot.line.me/oauth/authorize?';
    URL += 'response_type=code';
    URL += `&client_id=${environment.clientIdNotify}`;
    URL += `&redirect_uri=${location.origin}/authorize-callback`;
    URL += '&scope=notify';
    URL += '&state=notify';
    window.location.href = URL;
  }
  login(): void {
    let URL = 'https://access.line.me/oauth2/v2.1/authorize?';
    URL += 'response_type=code';
    URL += `&client_id=${environment.clientIdLineLogin}`;
    URL += `&redirect_uri=${location.origin}/authorize-callback`;
    URL += '&scope=profile openid email';
    URL += '&state=login';
    window.location.href = URL;
  }
}
