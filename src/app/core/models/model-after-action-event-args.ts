import { Model } from './model';
import { ModelActionType } from './model-action-type.enum';


export  class ModelAfterActionEventArgs {
    private readonly _actionType:ModelActionType;
    private readonly _success:boolean;
    public readonly _model?:Model;
    public readonly _error: any; // yasar


    constructor(actionType:ModelActionType,success: boolean, model?:Model,error?:any){
        this._actionType = actionType;
        this._success = success;
        this._model = model;
        this._error = error;
    }

    public get actionType():ModelActionType{
        return this._actionType;
    }

    public get success(): boolean{
        return this._success;
    }

    public get model(): Model{
        return this._model as Model;
    }
    public get error(): any{
        return this._error;
    }

}