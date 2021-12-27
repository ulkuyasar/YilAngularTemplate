import { UUID as uuid} from 'angular2-uuid';
import { Observable } from 'rxjs';
import { ModelValidationStatus } from './model-validation-status.enum';

export  class ModelBeforeActionEventArgs {
    private readonly _actionType:ModelActionType;
    private readonly _validationStatus:ModelValidationStatus;
    public cancel:boolean;
    public beforeAction:Observable<void> = null as any; // yasar


    constructor(actionType:ModelActionType,validationStatus:ModelValidationStatus){
        this._actionType = actionType;
        this._validationStatus = validationStatus;
        this.cancel = false;
    }

    public get actionType():ModelActionType{
        return this._actionType;
    }

    public get validationStatus(): ModelValidationStatus{
        return this._validationStatus;
    }


}