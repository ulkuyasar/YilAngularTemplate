import { Observable } from "rxjs";
import { Model } from "../models/model";
import { IService } from "./iservice";

export interface IModelService<T extends Model,TKey=number> extends IService{
    controller?:string;
    getByID(id:TKey):Observable<T>;
    getList():Observable<T[]>;
    create(model:T):Observable<T>;
    update(model:T):Observable<T>;
    delete(model:T):Observable<T>;
    deleteByID(id:TKey):Observable<T>;
}
