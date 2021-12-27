import { Observable } from "rxjs";
import { IPanelInstanceRef } from "../component-model/ipanel-instance-ref";
import { Model } from "../models/model";
import { ModelAfterActionType } from '../models/model-after-action-event-args'


export interface IModelComponent{
    useRoute:boolean;
    modelOperation:ModelOperation;
    panelInstanceRef:IPanelInstanceRef;

    create(afterActionType:ModelAfterActionType):Observable<Model>;
    update(afterActionType:ModelAfterActionType):Observable<Model>;
    delete(afterActionType:ModelAfterActionType):Observable<Model>;
    ok(afterActionType:ModelAfterActionType):Observable<Model>;

    menuModel():void;
    getModel():void;
    cleanModel():void;
    changeOperation(operation:ModelOperation):void;

}
