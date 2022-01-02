import { Injectable, Injector } from "@angular/core";
import DataSource from "devextreme/data/data_source";
import { BaseService } from "src/app/core/services/base-sevice";
import { LocalizationService } from "src/app/localization/localization.service";
import { BooleanModel } from "src/app/models/core/boolean-model";
import { ProcessMessageModel } from "src/app/models/core/process-message-model";

@Injectable()
export class ProcessMessageService extends BaseService{
   
    constructor(injector:Injector){
        super(injector);
    }
    processMessageList!: ProcessMessageModel[];
    
    getProcessDescription(processValue:string,value:string){

        const processMethodName:string = 'get'+processValue;

        // if ( typeof objectOfA['func'] === 'function') {
        //     objectOfA.func();
        // }
       // if(typeof this._title==="string"){

        //this.booksService[`${methodName}`]

        if( this[`${processMethodName}`] ){
            const dataSource: DataSource = this[processMethodName]();
            if (dataSource){
                dataSource.load();
                const itemOfDescription = dataSource.items().filter((processModel:ProcessMessageModel)=> processModel.Value===value);
                if(itemOfDescription.length>0){
                    return itemOfDescription[0].Description;
                }
            }
        }
        return value;
    }

   
}