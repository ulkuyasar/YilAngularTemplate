import { QueryStringParam } from "./query-string-param";

export interface IListComponent{
    autoRefresh:boolean;
    dataBind(options?:Partial<IDataSourceOptions>,load?:boolean):void;

}
