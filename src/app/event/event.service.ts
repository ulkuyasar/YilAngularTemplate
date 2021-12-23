import { Injectable, Injector } from "@angular/core"
import { Observable, Subject } from "rxjs"
import { BaseService } from "../core/services/base-sevice"
import { IEventMessage } from "./ievent-message"
import { ToastrService, IndividualConfig } from 'ngx-toastr'
import { NavigationStart, Router } from "@angular/router"
import { EventType } from "./event-type.enum"

@Injectable({providedIn:'root'})
export class EventService extends BaseService{
    
    private _eventSubject:Subject<IEventMessage>

    constructor(private toasttr:ToastrService, injector:Injector){
        super(injector);

        this._eventSubject = new Subject<IEventMessage>();

        let router: Router = injector.get<Router>(Router);
        router.events.subscribe(event => {
            if (event instanceof NavigationStart){
                this._eventSubject.next();
            }
        });
    }

    public get instance(): Observable<IEventMessage>{
        return this._eventSubject.asObservable();
    }

    public show(eventMessage:IEventMessage){
        return this._eventSubject.next(eventMessage);
    }

    public toast(eventMessage:IEventMessage,override?: Partial<IndividualConfig>){

        switch(eventMessage.Type){
            case EventType.Info:
                this.toastInfo(eventMessage.Message,eventMessage.Title,override);
                break;
            case EventType.Success:
                this.toastSuccess(eventMessage.Message,eventMessage.Title,override);
                break;

            case EventType.Warning:
                this.toastWarning(eventMessage.Message,eventMessage.Title,override);
                break;

            case EventType.Error:
                this.toastError(eventMessage.Message,eventMessage.Title,override);
                break;
            
            default:
                break;

        }
    }
    toastError(Message?: string, Title?: string , override?: Partial<IndividualConfig>) {
        this.toasttr.error(Message,Title,override);
    }
    toastInfo(Message?: string, Title?: string , override?: Partial<IndividualConfig>) {
        this.toasttr.info(Message,Title,override);
    }
    toastSuccess(Message?: string, Title?: string , override?: Partial<IndividualConfig>) {
        this.toasttr.success(Message,Title,override);
    }
    toastWarning(Message?: string, Title?: string , override?: Partial<IndividualConfig>) {
        this.toasttr.warning(Message,Title,override);
    }
}