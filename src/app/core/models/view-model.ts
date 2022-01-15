import { Model } from "./model";

export class ViewModel<T extends Model> extends Model{
    Id: number;
    Entity: T;

}