import { Injectable, Injector } from "@angular/core";
import { ModelService } from "src/app/core/services/model-service";
import { FWAccessModelViewModel } from "src/app/models/fw-access/view-model/fw-access-node-view-model";

@Injectable()
export class FwAccessTopologyService extends ModelService<FWAccessModelViewModel>{
    constructor(injector:Injector){
        super(injector,'accessrequesttopologies');

    }
}