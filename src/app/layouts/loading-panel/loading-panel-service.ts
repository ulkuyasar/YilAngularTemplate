import { Injectable,Type, Injector } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { ComponentDictionary } from "src/app/core/component-model/component-dictionary";
import { IComponent } from "src/app/core/component-model/icomponent";
import { BaseService } from "src/app/core/services/base-sevice";
import { ILoadingPanelOptions } from "./iloading-panel.options";


@Injectable({ providedIn:'root'})
export class LoadingPanelService extends BaseService{

    private _loadingPanelSubject:Subject<ILoadingPanelOptions>;

    private _active:boolean;
    private _elementID:string="";
    private _ashowDelay:boolean;
    private _message:string="";

    constructor(injector:Injector){
        super(injector);
        this._loadingPanelSubject = new Subject<ILoadingPanelOptions>();
        this._active = false;
        this._ashowDelay = false;
    }

    get instance():Observable<ILoadingPanelOptions>{
        return this._loadingPanelSubject.asObservable();
    }

    public start(elementID:string="",message:string="",showDelay:boolean=false):void{
        this._active = true;
        this._elementID = elementID;
        this._message = message;
        this._ashowDelay = showDelay;
        this.changeOptions();
    }

    public stop():void{
        this._active = false;
        this._elementID = "";
        this._message = "";
        this._ashowDelay = false;
        this.changeOptions();
    }

    public message(message:string):void{
        this._message = message;
        this.changeOptions();
    }

    public unsubscribe():void{
        this._loadingPanelSubject.unsubscribe();
    }

    private changeOptions():void{
        this._loadingPanelSubject.next({elementID:this._elementID,
                                        message:this._message,
                                        showDelay:this._ashowDelay,
                                        active:this._active});
    }
    
}