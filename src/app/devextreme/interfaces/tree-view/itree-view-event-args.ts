import { Model } from "src/app/core/models/model";
import { ITreeViewComponent } from "./itree-view-component";
import { ITreeViewNode } from "./itree-view-node";

export interface ITreeViewEventArgs<T extends Model>{
    component:ITreeViewComponent;
    node:ITreeViewNode;
    itemData:T;
}