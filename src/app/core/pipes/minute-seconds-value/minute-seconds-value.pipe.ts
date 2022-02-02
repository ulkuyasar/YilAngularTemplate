import { Pipe, PipeTransform } from "@angular/core";
import { EnumService } from "src/app/services/core/enum.service";

@Pipe({
    name:'minuteSeconds'
})
export class MinuteSecondsPipe implements PipeTransform{

    transform(value:number): string {

      let minutes:number = Math.floor(value/60);
      let seconds:number = value - Math.floor(value/60);

      const minutesView:string = minutes <10 ? "0"+minutes.toString() : minutes.toString();
      const secondsView:string = seconds <10 ? "0"+seconds.toString() : seconds.toString();
      return minutesView + ":"+secondsView;


    }

}
