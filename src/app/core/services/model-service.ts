
import { Injector } from "@angular/core";
import { Observable, Subscriber } from "rxjs";
import { Model } from "../models/model";
import { ApiService } from "./api-service";
import { IModelService } from "./imodel-service";
import { ModelOperation } from "../models/model-operation.enum";
import { concatMap } from "rxjs/operators";
import { Virtual } from "../decorators/virtual";
import { DataSourceOptions } from "../data/data-source-options";


export abstract class  ModelService<T extends Model,TKey=number> extends ApiService implements IModelService<T,TKey>{
    
    controller: string;

    constructor(injector:Injector, controller?:string,customUrl?:string){
        super(injector,controller,customUrl);      
    }
    
    getBaseUrl(){
        return this.apiUrl;
    }
    getByID(id: TKey):Observable<T>{
        return this.getRequest<T>(this.getBaseUrl()+'/'+id);
    }
    getList():Observable<T[]>{
        return this.getRequest<T[]>(this.getBaseUrl());
    }

    create(model:T):Observable<T>{
        let $validate = this.validate(model,ModelOperation.New);
        return $validate.pipe(
            concatMap(validatedModel=>{
                return this.postRequest<T>(this.getBaseUrl(),JSON.stringify(validatedModel));
            })
        );
    }

    update(model:T):Observable<T>{
        let $validate = this.validate(model,ModelOperation.Edit);
        return $validate.pipe(
            concatMap(validatedModel=>{
                return this.putRequest<T>(this.getBaseUrl(),JSON.stringify(validatedModel));
            })
        );
    }

    delete(model:T):Observable<T>{
        let $validate = this.validate(model,ModelOperation.Delete);
        return $validate.pipe(
            concatMap(validatedModel=>{
                return this.deleteRequest<T>(this.getBaseUrl()+'/'+validatedModel.Id);
            })
        );
    }

    deleteByID(id:TKey):Observable<T>{
        return this.deleteRequest<T>(this.getBaseUrl()+'/'+id);
    }

    validate(model :T,modelOperation:ModelOperation ):Observable<T>{
        let $validate = new Observable<T>((subsriber:Subscriber<T>)=>{
            let validateModel:T = this.validateModel(model,modelOperation);
            subsriber.next(validateModel);
            subsriber.complete();
        })
        return $validate;
    }

    @Virtual()
    public validateModel(model :T,modelOperation:ModelOperation ):T{
        return model;
    }

    @Virtual()
    protected createDataSourceOptions():DataSourceOptions{
        return new DataSourceOptions();
    }

    @Virtual()
    protected appendDefaultDataSourceOptions(options:DataSourceOptions):void{
        
    }

}