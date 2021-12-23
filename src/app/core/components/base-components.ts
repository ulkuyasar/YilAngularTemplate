import { AfterViewInit, OnDestroy, OnInit, ViewContainerRef,Injector,ElementRef,ComponentFactoryResolver,ChangeDetectorRef,EventEmitter,Type,InjectionToken, Input } from "@angular/core";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { ComponentHierarchyInfo } from "src/app/layouts/component-hierarchy/component-hierarchy-info";
import { ComponentHierarchyService } from "src/app/layouts/component-hierarchy/component-hierarchy-service";
import { GlobalConstants, IGlobalConstants } from "src/app/utilities/global-constants";
import { GlobalUtilities } from "src/app/utilities/global-utilities";
import { IPanelInstanceRef } from "../component-model/ipanel-instance-ref";
import { DataContext } from "../data/data-context";
import { NavigationService } from "../navigation/navigation.service";
import { DataContextService } from "../services/data-context.service";
import { LocalizationService } from 'src/app/localization/localization.service'

export abstract class BaseComponent implements OnInit, OnDestroy, AfterViewInit{
    
    private __componentClassName() => string;


    @Input('id')
    Id:string;

    @Input()
    name:string;

    @Input('visible')
    visible:boolean;

    @Input('useRoute')
    useRoute:boolean;

    @Input('title')
    private _title: string | Function; 

    @Input('dataContext')
    private _dataContext: DataContext;

    private _isDestroyed: boolean = false;

    private _componentID: string;
    private _hierarchyInfo: ComponentHierarchyInfo;

    private _authenticationKey: string;
    private _router : Router;
    private _activatedRoute : ActivatedRoute;
    private _componentFactoryResolver : ComponentFactoryResolver;
    private _changeDetector : ChangeDetectorRef;
    private _dataContextService : DataContextService;

    private _componentHierarchyService: ComponentHierarchyService;

    public panelInstanceRef: IPanelInstanceRef;

    public globalConstants: IGlobalConstants;

    public authentiticationKeyChangedEvent: EventEmitter<string>;

    //Subscrribers
    private _appConfigSubscription: Subscription;
    private _settingSubscription: Subscription;

    constructor(public viewContainerRef:ViewContainerRef){
        this._componentID = GlobalUtilities.NewGuid();
        this.visible = true;
        this.useRoute = true;

        this._router = this.Injector.get<Router>(Router);
        this._activatedRoute = this.Injector.get<ActivatedRoute>(ActivatedRoute);
        this._componentFactoryResolver = this.Injector.get(ComponentFactoryResolver);

        this._changeDetector = this.Injector.get(ChangeDetectorRef);
        this._dataContextService = this.Injector.get<DataContextService>(DataContextService);
        this._componentHierarchyService = this.Injector.get<ComponentHierarchyService>(ComponentHierarchyService);

        this._dataContextService.register(this.Instance);
        this.globalConstants = GlobalConstants;

        this.authentiticationKeyChangedEvent = new EventEmitter<string>();
        this.setAuthenticationKey();
        
    }

    public getClassName():string {
        if (this.__componentClassName){
            return this.__componentClassName();
        }

        return this.Instance.constructor.name;
    }

    get isDestroyed():boolean{
        return this._isDestroyed;
    }

    get componentID():string{
        return this._componentID;
    }


    get dataContext():DataContext{
        if (this.dataContext){
            return this._dataContext;
        }
        return this._dataContextService.get(this.Instance)
    }

    get Injector():Intector{
        return this.viewContainerRef.injector;
    }

    get componentFactoryResolver():ComponentFactoryResolver{
        return this._componentFactoryResolver;
    }

    get changeDetector():ChangeDetectorRef{
        return this._changeDetector;
    }


    get componentHierarchyService():ComponentHierarchyService{
        return this._componentHierarchyService;
    }

    get elementRef(): ElementRef<any>{
        return this.viewContainerRef.element;
    }

    get rootData():Observable<Data> {
        return this.activatedRoute.root.firstChild.data;
    }

    get router():Router{
        return this._router;
    }

    get activatedRoute():ActivatedRoute{
        return this._activatedRoute;
    }

    get navigator(): NavigationService{
        return this.Injector.get<NavigationService>(NavigationService);
    }

    get localization(): LocalizationService{
        return this.Injector.get<LocalizationService>(LocalizationService);
    }

    get event(): EventService{
        return this.Injector.get<EventService>(EventService);
    }





























}