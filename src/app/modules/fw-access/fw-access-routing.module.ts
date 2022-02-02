import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FwAccessRoutes } from "./fw-access-routes";


@NgModule({
  declarations: [],
  imports:[
    CommonModule,
    RouterModule.forChild(FwAccessRoutes),
  ],
  exports:[
    RouterModule
  ]
})
export class FwAccessRoutingModule { }
