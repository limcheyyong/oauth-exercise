import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthorizeCallbackComponent } from './pages/authorize-callback/authorize-callback.component';
import { SharedMaterialModule } from './shared/shared-material/shared-material.module';
import { AlertComponent } from './components/alert/alert.component';
import { TokenInterceptor } from './shared/interceptor/token.interceptor';

@NgModule({
  declarations: [AppComponent, AuthorizeCallbackComponent, AlertComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedMaterialModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
