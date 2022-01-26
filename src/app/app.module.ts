import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule,  SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import {LayoutModule} from './layouts/layout.module'
import { HttpClientModule } from '@angular/common/http';
import { LocalizationModule } from './localization/localization.module';
import { EventModule } from './event/event-module';
import { StartupModule } from './startup/startup.module';
import { ConfigModule } from './config/config.module';
import { ServicesModule } from './services/services.module';
import { BaseService } from './core/services/base-sevice';

@NgModule({
  declarations: [
    AppComponent,
    // MainComponent,
    // RoorComponent,
    // RouteNotFountComponent
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
  
    SideNavOuterToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    
  ],
  providers: [AuthService,  AppInfoService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector:Injector){
    BaseService.appInjector = injector;
  }
 }
