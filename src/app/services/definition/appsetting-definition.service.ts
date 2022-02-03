import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { ModelService } from "src/app/core/services/model-service";
import { DefinitionAppsettingViewModel } from "src/app/models/definition/definition-appsetting-view-model";

//bu sınıfınbaskamethdlarıda var. kontroledılebılır videodan

@Injectable()
export class AppsettingDefinitionService extends ModelService<DefinitionAppsettingViewModel>{
  constructor(injector:Injector){
    super(injector,'yilAppSettings');
  }
  getUserInfo(tokenUrl:string):Observable<TokenResponce>{
    const requestOptions={withCredentials:true};
    return this.http.get<TokenResponce>(tokenUrl,requestOptions);
  }
}

interface TokenResponce{
  token:string;
}
