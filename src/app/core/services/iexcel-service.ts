import { Observable } from "rxjs";

export interface IExcelService<TExcelViewModel,TExcelDataModel>{
    uploadExcelFile(dataModel:TExcelViewModel,requestData:any):Observable<TExcelViewModel[]>;
    saveExcelFile(excelViewModel:TExcelViewModel[]):Observable<boolean>;
}
