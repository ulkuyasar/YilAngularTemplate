import { Model } from "src/app/core/models/model";

export class ExcellViewModel<T extends Model> extends ViewModel<T> {
 
    public CommercialTitle?:string;
    public Messahe?:string;
    public ColumnState?:number;
}
