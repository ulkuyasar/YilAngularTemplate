import { Pipe, PipeTransform } from "@angular/core";
import { EnumService } from "src/app/services/core/enum.service";

@Pipe({
    name:'enumValue'
})
export class EnumValuePipe implements PipeTransform{

    constructor(private _enumService:EnumService){

    }

    transform(value:number,enumName?:string,displayNone:boolean=false): string | number{
        if(enumName){
            return this._enumService.getEnumDescription(enumName,value,displayNone)
        }
        if(displayNone){
            return "";
        }
        return value;
    }

}
