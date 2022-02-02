import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { dashboardRoutes } from "./dashboard-routes";


@NgModule({
  declarations: [],
  imports:[
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
  ],
  exports:[
    RouterModule
  ]
})
export class DashboardRoutingModule { }
