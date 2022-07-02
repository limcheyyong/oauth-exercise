import { LineLoginAuthGuard } from './shared/guard/line-login-auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizeCallbackComponent } from './pages/authorize-callback/authorize-callback.component';
import { NotifyAuthGuard } from './shared/guard/notify-auth.guard';

const redirectTo = () => {
  const state = sessionStorage.getItem('state');
  if (!state) {
    return 'login';
  }

  return state === 'notify' ? 'notify' : 'person';
};

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'notify',
    canActivate: [NotifyAuthGuard],
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'person',
    canActivate: [LineLoginAuthGuard],
    loadChildren: () =>
      import('./pages/person/person.module').then((m) => m.PersonModule),
  },
  { path: 'authorize-callback', component: AuthorizeCallbackComponent },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: redirectTo(),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
