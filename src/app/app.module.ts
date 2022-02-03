import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppComponent } from './app.component';
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
import { VersionCheckService } from './version-check.service';
import { RefreshTokenInterceptor } from './authentication/refresh-token.interceptor';
import { AuthenticationInterceptor } from './authentication/authentication.interceptor';
import { ErrorInterceptor } from './core/http/error-interceptor';
import { JsonInterceptor } from './core/http/json-interceptor';

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
   // LayoutModule,
    ServicesModule,
  //  AppRoutingModule,
    LoginModule,

yasar .... dx component modulerı yuklenırken hata alınıyor....



    HttpClientXsrfModule.withOptions({
      cookieName:'X-XSRF-TOKEN',
      headerName:'XSRF-TOKEN',
    }),
    MarkdownModule.forRoot()

  ],
  providers: [
  {
    provide:HTTP_INTERCEPTORS,
    useClass:RefreshTokenInterceptor,
    multi:true
  },
  // {
  //   provide:HTTP_INTERCEPTORS,
  //   useClass:AuthenticationInterceptor,
  //   multi:true
  // },
  {
    provide:HTTP_INTERCEPTORS,
    useClass:ErrorInterceptor,
    multi:true
  },
  {
    provide:HTTP_INTERCEPTORS,
    useClass:JsonInterceptor,
    multi:true
  },
  // {
  //   provide:HTTP_INTERCEPTORS,
  //   useClass:HttpXsrfInterceptor,
  //   multi:true
  // },

    VersionCheckService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(injector:Injector){
    BaseService.appInjector = injector;
  }
 }
