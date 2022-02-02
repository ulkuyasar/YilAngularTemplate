import { EnumModel } from "src/app/models/core/enum-model";
import { Model } from "../models/model";

export interface ISelectedItemChangedArgs<TModal extends Model | EnumModel>{
    selectedItem:TModal;
}



// import { EnumModel } from "src/app/models/core/enum-model";
// import { Model } from "src/app/core/models/model";

// export interface ISelectBoxSelectionChangedArgs<TModal extends Model | EnumModel>{
//     selectedItem:TModal;
// }
