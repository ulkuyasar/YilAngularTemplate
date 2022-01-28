import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LayoutModule } from "../layouts/layout.module";
import { LogoutComponent } from "./logout/logout.component";

@NgModule({
  declarations: [
    LogoutComponent
    // MainComponent,
    // RoorComponent,
    // RouteNotFountComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,

  ],
  entryComponents:[LogoutComponent]
})
export class LoginModule{}
