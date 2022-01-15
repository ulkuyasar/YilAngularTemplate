import { EventEmitter, Injectable, Injector } from "@angular/core";
import { from, Observable } from "rxjs";
import { BaseService } from "src/app/core/services/base-sevice";



@Injectable({providedIn:"root"})
export class MenuService extends BaseService {

  // private beamerDefinitionAppSettingFilterModel:BeamerDefinitionAppSettingFilterModel;
  // private _beamerAppSettingDefinitionService:BeamerAppSettingDefinitionService;

  private _currentTabKey:string;
  private _tenantCode:string;
  public tabKeyChangedEvent = new EventEmitter<string>();



   constructor(injector: Injector){
         super(injector);
        this.tabKeyChangedEvent = new EventEmitter<string>();
        this.injectService();
      // this.beamerDefinitionAppSettingFilterModel = new BeamerDefinitionAppSettingFilterModel();
      // this.beamerDefinitionAppSettingFilterModel.Key = "TenantCode";

   }

   private injectService():void{
    //  this._beamerAppSettingDefinitionService = this.Injector.get<BeamerAppSettingDefinitionService>(BeamerAppSettingDefinitionService);
   }

   public get currentTabKey():string{
     if(this._currentTabKey){
       return this._currentTabKey;
     }
     return this.getDefaultTabKey();
   }

   public setTabKey(tabKey:string):boolean{
     let isChanged:boolean = this._currentTabKey !== tabKey;
     this._currentTabKey = tabKey;
     if (isChanged){
       this.onTabKeyChanged(tabKey);
     }
     return isChanged;
   }

   private getDefaultTabKey():string{
     return "DEFAULT";
   }

   private onTabKeyChanged(tabKey:string){
    let handled:boolean=false;
    if (this.tabKeyChangedEvent.observers.length >0){
      handled = true;
      this.tabKeyChangedEvent.emit(tabKey);
    }
    return handled;
   }

   public getMenuItemSource():Observable<object>{
     return null;
    //  return this._beamerAppSettingDefinitionService.getWithKey(this.beamerDefinitionAppSettingFilterModel)
    //  .pipe(
    //     concatMap(resp =>{
    //       if(resp==null){
    //         return;
    //       }
    //       this._tenantCode = resp.Data[0].Value.toLowerCase();
    //       const promise = import(`src/assets/menu/${this._tenantCode}.menu.json`);
    //       return from(promise);
    //     })
    //  )
   }



  
}

