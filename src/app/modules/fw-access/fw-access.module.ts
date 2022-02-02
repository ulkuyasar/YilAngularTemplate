import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DxAccordionModule } from "devextreme-angular";
import { LayoutModule } from "src/app/layouts/layout.module";
import { FWAccessTopologyNodeComponent } from "./components/topology-node/list/fw-access-topology-node.component";
import { FwAccessTopologyNodeModelComponent } from "./components/topology-node/model/fw-access-topology-node-model.component";
import { FwAccessRoutingModule } from "./fw-access-routing.module";

@NgModule({
  declarations: [
    FWAccessTopologyNodeComponent,
    FwAccessTopologyNodeModelComponent

  ],
  imports:[
    CommonModule,
    FwAccessRoutingModule,
    LayoutModule,
    DxAccordionModule
  ],
  providers:[],
  entryComponents:[]   // [FWAcessGroupMachineModelComponent]
})
export class FwAccessModule { }
