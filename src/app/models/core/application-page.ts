import { Model } from "src/app/core/models/model";
import { UUID as uuid} from 'angular2-uuid';

export class ApplicationPage extends Model{
 
    constructor(id:uuid,name:string,url:string){
        super();
        this.Id = id;
        this.Name=name;
        this.Url=url;
    }

    Id:uuid;
    Name:string;
    Url:string;

}
