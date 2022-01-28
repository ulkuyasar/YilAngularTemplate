import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppComponent } from './app.component';
import {   SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import {LayoutModule} from './layouts/layout.module'
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocalizationModule } from './localization/localization.module';
import { EventModule } from './event/event-module';
import { StartupModule } from './startup/startup.module';
import { ConfigModule } from './config/config.module';
import { ServicesModule } from './services/services.module';
import { BaseService } from './core/services/base-sevice';
import { LoginModule } from './login/login-model';
import { MainComponent } from './components/main/main.component';
import { RootComponent } from './components/root/root.component';
import { RouteNotFoundComponent } from './components/route-not-found/route-not-found.component';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    RootComponent,
    RouteNotFoundComponent
  ],
  entryComponents:[],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LocalizationModule,
    EventModule,
    StartupModule,
    ConfigModule,
    LayoutModule,
    ServicesModule,
    AppRoutingModule,
    LoginModule,

    HttpClientXsrfModule.withOptions({
      cookieName:'X-XSRF-TOKEN',
      headerName:'XSRF-TOKEN',
    }),
    MarkdownModule.forRoot()

  ],
  providers: [
  {
    provide:HTTP_INTERCEPTORS,
    useClass:RefreshTokenInterceptor  ---- ysarrr     authentication classlarını yaz
  }




    AuthService,  AppInfoService

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector:Injector){
    BaseService.appInjector = injector;
  }
 }
