import { Injector } from "@angular/core";
import { PopupService } from "src/app/layouts/popup/popup-service";
import { LocalizationService } from "src/app/localization/localization.service";
import { Virtual } from "../decorators/virtual";
import { Model } from "../models/model";
import { BaseService } from "./base-sevice";


export abstract class  ModelEditService<T extends Model> extends BaseService{
    
    private _popupService:PopupService;
    private _localizationService:LocalizationService;
  
    constructor(injector:Injector){
        super(injector);
        this.injectService();      
    }
   
    protected get popupService():PopupService{
        return this._popupService;
    }

    get localization():LocalizationService{
        return this._localizationService;
    }

    @Virtual()
    protected injectService():void{
        this._popupService = this.Injector.get<PopupService>(PopupService);
        this._localizationService = this.Injector.get<LocalizationService>(LocalizationService);

    }

}