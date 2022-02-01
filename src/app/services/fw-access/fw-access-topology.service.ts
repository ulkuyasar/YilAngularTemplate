import { Injectable, Injector } from "@angular/core";
import { filter } from "lodash";
import { Observable } from "rxjs";
import { ModelService } from "src/app/core/services/model-service";
import { IPage } from "src/app/models/core/page";
import { FWAccessTopologyFilterModel } from "src/app/models/fw-access/filter-model/fwaccesstopologyfiltermodel";
import { FWAccessNodeViewModel } from "src/app/models/fw-access/view-model/fw-access-node-view-model";

@Injectable()
export class FwAccessTopologyService extends ModelService<FWAccessNodeViewModel>{
    constructor(injector:Injector){
        super(injector,'accessrequesttopologies');

    }

    getWithName(filterModel:FWAccessTopologyFilterModel):Observable<IPage<FWAccessNodeViewModel>>{
      return this.http.get<IPage<FWAccessNodeViewModel>>(this.getBaseUrl()+"/filter?name="+filterModel.Name+
      "&page="+filterModel.PageRequest.page+"&order="+filterModel.PageRequest.order+"&limit="+filterModel.PageRequest.limit+"&isAscending="+filterModel.PageRequest.isAssencding);
    }
}
