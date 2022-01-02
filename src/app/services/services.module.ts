import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FwAccessTopologyService } from "./fw-access/fw-access-topology.service";

@NgModule({
    imports: [
      CommonModule
    ],
    providers: 
    [FwAccessTopologyService
    // buraya yenı ekledıgın servıslerı eklemelısın
    ]
  })
  export class ServicesModule { 
  }