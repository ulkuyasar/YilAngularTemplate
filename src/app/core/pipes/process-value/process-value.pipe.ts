import { Pipe, PipeTransform } from "@angular/core";
import { ProcessMessageService } from "src/app/services/core/process-message-service";

@Pipe({
    name:'processValue'
})
export class ProcessValuePipe implements PipeTransform{

    constructor(private _processMessageService:ProcessMessageService){
    }

    transform(value:string,enumName?:string): string | number{
        if(enumName){
            return this._processMessageService.getProcessDescription(enumName,value);
        }
        return value;
    }

}
