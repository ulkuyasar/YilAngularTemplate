import { Model } from "../models/model";
import { ModelFieldDirective } from "./model-field-directive";

export interface IParentField{
    key:string;
    field:ModelFieldDirective<Model>
}