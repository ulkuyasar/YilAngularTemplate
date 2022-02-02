import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { DxGalleryModule } from "devextreme-angular";
import { LayoutModule } from "src/app/layouts/layout.module";
import { DashboardRoutingModule} from "./dashboard-routing.module";
import { PopoverModule } from "ngx-bootstrap/popover";
import { DashboardComponent } from "./components/dashboard/list/dashboard.component";

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports:[
    CommonModule,
    DashboardRoutingModule,
    LayoutModule,
    DxGalleryModule,
    PopoverModule.forRoot(),
    //EnvironmentLinkModule
  ],
  entryComponents:[],   // [FWAcessGroupMachineModelComponent]
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
