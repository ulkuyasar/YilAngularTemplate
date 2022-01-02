import { Injectable, Injector } from "@angular/core";
import DataSource from "devextreme/data/data_source";
import { BaseService } from "src/app/core/services/base-sevice";
import { LocalizationService } from "src/app/localization/localization.service";
import { BooleanModel } from "src/app/models/core/boolean-model";

@Injectable()
export class BooleanService extends BaseService{
   
    constructor(injector:Injector){
        super(injector);
    }
    
    getBooleanwithEmptyOption():DataSource{
        const booleanList: BooleanModel[]=[
            {Description:"Evet",Value:true},
            {Description:"Hayır",Value:false}
        ];
        return new DataSource(booleanList);
    }

    getIsActivewithEmptyOption():DataSource{
        const booleanList: BooleanModel[]=[
            {Description:"Aktif",Value:true},
            {Description:"Pasif",Value:false}
        ];
        return new DataSource(booleanList);
    }
}