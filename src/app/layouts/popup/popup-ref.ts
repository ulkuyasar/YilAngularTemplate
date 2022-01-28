import { Observable, Subscriber } from "rxjs";
import { BaseComponent } from "src/app/core/components/base-component";
import { IPopupRef } from './ipopup-ref'
import { PopupService } from "./popup-service";

export class PopupRef<T extends BaseComponent> implements IPopupRef {

    componentInstance:T;

    public beforeOpenedSubscriber:Subscriber<any>;
    public afterOpenedSubscriber:Subscriber<any>;
    public beforeClosedSubscriber:Subscriber<any>;
    public afterClosedSubscriber:Subscriber<any>;

    private _popupService:PopupService;

    constructor(popupService:PopupService){
        this._popupService = popupService;
        //  this.beforeOpenedSubscriber=Subscriber<any>();
        //  this.afterOpenedSubscriber=Subscriber<any>();
        //  this.beforeClosedSubscriber=Subscriber<any>();
        //  this.afterClosedSubscriber=Subscriber<any>();
    }
    panelComponentID: string;
    containerDivID: string;
    alwaysReturn:boolean=false;

    getComponentInstance():BaseComponent{
        return this.componentInstance;
    }

    public beforeOpened():Observable<any>{
        return new Observable<any>((subscriber:any) => {
            this.beforeOpenedSubscriber = subscriber;
        });
    }

    public afterOpened():Observable<any>{
        return new Observable<any>((subscriber:any) => {
            this.afterOpenedSubscriber = subscriber;
        });
    }

    public beforeClosed():Observable<any>{
        return new Observable<any>((subscriber:any) => {
            this.beforeClosedSubscriber = subscriber;
        });
    }

    public afterClosed():Observable<any>{
        return new Observable<any>((subscriber:any) => {
            this.afterClosedSubscriber = subscriber;
        });
    }

    public close():void{
        this._popupService.close(this.panelComponentID);
    }

    public updatePosition(offset:{x:number,y:number}):void{
        this._popupService.updatePosition(this.panelComponentID,offset);
    }

    public updateSize(size:{width?:number|string|Function ,height ?:number|string|Function}):void{
        this._popupService.updateSize(this.panelComponentID,size);
    }

    public updateTitle(title:string):void{
        this._popupService.updateTitle(this.panelComponentID,title);
    }
}
