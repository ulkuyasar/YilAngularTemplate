import { Model } from "src/app/core/models/model";
import { ViewModel } from "src/app/core/models/view-model";

export class ExcellViewModel<T extends Model> extends ViewModel<T> {

    public CommercialTitle?:string;
    public Messahe?:string;
    public ColumnState?:number;
}
