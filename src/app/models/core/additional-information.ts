import { UUID as uuid} from 'angular2-uuid';
export class AdditionalInformation{
 
    constructor(public id:uuid,public title:string, public destription:string, public color:string,public icon:string,public order:number,public image:string)
    {
        this.Id=id;
        this.Title=title;
        this.Destription=destription;
        this.Color=color;
        this.Icon=icon;
        this.Order=order;
        this.Image=image;   
    }

    Id:uuid;
    Title:string;
    Destription:string;
    Color:string;
    Icon:string;
    Order:number;
    Image:string;

}
