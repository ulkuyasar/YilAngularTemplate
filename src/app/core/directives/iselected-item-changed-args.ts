import { EnumModel } from "src/app/models/core/enum-model";
import { Model } from "../models/model";

export interface ISelectedItemChangedArgs<TModel extends Model|EnumModel>{
    selectedItem:TModel;
}