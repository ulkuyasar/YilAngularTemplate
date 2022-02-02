import { Model } from "src/app/core/models/model";
import { EnumModel } from "src/app/models/core/enum-model";

export interface ISelectBoxSelectionChangedArgs<TModal extends Model | EnumModel>{
    selectedItem:TModal;
}
