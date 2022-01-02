import { stat } from "fs";

export class BuildState{
 
    constructor(public url:string, public state:string){}

    get icon():string{
        if(this.state==="Stable")
        {
            return "sentiment_very_satisfied";
        }
        if(this.state==="Failed")
        {
            return "sentiment_very_dissatisfied";
        }
        return "radio_button_unchecked";
    }

}
