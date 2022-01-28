import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app-routes';



@NgModule({
  declarations: [],
  imports:[
    CommonModule,
    RouterModule.forRoot(appRoutes,{enableTracing:false}),
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
