import { IDataSourceOptions } from "../data/idata-source-options";


export interface IListComponent{
    autoRefresh:boolean;
    dataBind(options?:Partial<IDataSourceOptions>,load?:boolean):void;

}
