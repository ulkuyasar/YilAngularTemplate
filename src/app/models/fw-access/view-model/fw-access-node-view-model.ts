import { Model } from "src/app/core/models/model";

export class FWAccessNodeViewModel extends Model{
    Name?:string;
    DeviceType?:number;
    BrandType?:number;
    OperationSystem?:number;
    Ip?:string;
    Version?:string;

}
