import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BooleanService } from "./core/boolean-service";
import { ProcessMessageService } from "./core/process-message-service";
import { AppsettingDefinitionService } from "./definition/appsetting-definition.service";

import { FwAccessTopologyService } from "./fw-access/fw-access-topology.service";

@NgModule({
    imports: [
      CommonModule
    ],
    providers:
    [
      BooleanService,
      ProcessMessageService,
      AppsettingDefinitionService,
      FwAccessTopologyService
    // buraya yenı ekledıgın servıslerı eklemelısın
    ]
  })
  export class ServicesModule {
  }
