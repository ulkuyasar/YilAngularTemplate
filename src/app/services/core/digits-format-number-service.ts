import { formatNumber } from "@angular/common";
import { Injectable, Injector } from "@angular/core";



@Injectable()
export class DigitsFormatNumberService {
   
    public static DigitsformatNumber(modelValue:string,franctionDigits:number):string{
        return Number(modelValue) ===0 ? "0" :
        formatNumber(Number(modelValue),"tr-TR","."+franctionDigits.toString()+"-"+franctionDigits.toString());
     
    }
    
   
}