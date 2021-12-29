import { Observable, Subscriber } from "rxjs";
import { IPanelInstanceRef } from "src/app/core/component-model/ipanel-instance-ref";
import { BaseComponent } from "src/app/core/components/base-component";

export class PopupRef<T extends BaseComponent> extends IPopupRef{

    panelComponentID:string;
    containerDivID:string;  
    alwaysReturn:boolean=false;

    componentInstance:T;

    public beforeOpenedSubscriber:Subscriber<any>;
    public afterOpenedSubscriber:Subscriber<any>;
    public beforeClosedSubscriber:Subscriber<any>;
    public afterClosedSubscriber:Subscriber<any>;

    private _popupService:PopupService;

    constructor(popupService:PopupService){
        _popupService = popupService;
        //  this.beforeOpenedSubscriber=Subscriber<any>();
        //  this.afterOpenedSubscriber=Subscriber<any>();
        //  this.beforeClosedSubscriber=Subscriber<any>();
        //  this.afterClosedSubscriber=Subscriber<any>();
    }

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