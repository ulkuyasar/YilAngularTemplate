import { Injectable } from "@angular/core";
import { GlobalUtilities } from "./global-utilities";

@Injectable({ providedIn: 'root'})
export class StringUtilities  {
   


    public static getLastCharacterOfString(value:string):string{
        let lastchar = value.charAt(value.length-1);
        return lastchar;
    }

    public static isLastCharacterSlash(value:string):boolean{
        if (StringUtilities. getLastCharacterOfString(value)=='/')
            return true;
        else
            return false;
    }

    public static capitiliazeFirstCharacter(value:string):string{
        if (value){
            return value.charAt(0).toUpperCase()+value.slice(1);
        }
        return value;
    }

    public static padLeft(value:string,padding:string|number){
        if(GlobalUtilities.IsNumber(padding)){
            return Array(padding+1).join(" "+value);
        }

        if(GlobalUtilities.IsNumber(padding)){
            return padding+value;
        }

        throw new Error(`Expected string or number, got '${padding}'.`);  //yasar   harika kullanım       
    }

    public static combinePath(path1:string,path2:string):string{
        if(path2 == null || path2 == undefined){
            return path1;
        }

        if(path1 == null || path1 == undefined){
            path1="";
        }
        return path1+(StringUtilities.isLastCharacterSlash(path1)?path2:'/'+path2);
    }

    public static getValueForComparison(value:string,caseSensitive:boolean=false):string{
        const valueResolved = caseSensitive ? value : (value==null ? "":value.toLocaleLowerCase());
        return valueResolved;
    }



}