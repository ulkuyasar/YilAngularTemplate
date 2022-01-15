import { AfterViewInit, OnDestroy, OnInit, ViewContainerRef,Injector,ElementRef,ComponentFactoryResolver,ChangeDetectorRef,EventEmitter,Type,InjectionToken, Input, Component } from "@angular/core";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { Observable, Subscription,  } from "rxjs";
import { ComponentHierarchyInfo } from "src/app/layouts/component-hierarchy/component-hierarchy-info";
import { ComponentHierarchyService } from "src/app/layouts/component-hierarchy/component-hierarchy-service";
import { GlobalConstants, IGlobalConstants } from "src/app/utilities/global-constants";
import { GlobalUtilities } from "src/app/utilities/global-utilities";
import { IPanelInstanceRef } from "../component-model/ipanel-instance-ref";
import { DataContext } from "../data/data-context";
import { NavigationService } from "../navigation/navigation.service";
import { DataContextService } from "../services/data-context.service";
import { LocalizationService } from 'src/app/localization/localization.service'
import { EventService } from "src/app/event/event.service";
import { LoadingPanelService } from "src/app/layouts/loading-panel/loading-panel-service";
import { IComponent } from "../component-model/icomponent";

import { ConfigService } from "src/app/config/config.service";
import { IConfigSubscriber } from "src/app/config/iconfig-subscriber";
import { Virtual } from "../decorators/virtual";
import { AuthenticationService } from "src/app/authentication/authentication.service";
import { AuthenticationContextType } from "src/app/authentication/authentication-context-type";

@Component({   //yasar sen ekledın
    template: ''
})
export abstract class BaseComponent implements OnInit, OnDestroy, AfterViewInit{
    
    private __componentClassName?: () => string;
    
    @Input('id')
    Id:string="";       // yasar

    @Input()
    name:string="";     // yasar

    @Input('visible')
    visible:boolean;

    @Input('useRoute')
    useRoute:boolean;

    @Input('title')
    private _title: string | Function = Object; // yasar

    @Input('dataContext')
    private _dataContext: DataContext;

    private _isDestroyed: boolean = false;

    private _componentID: string;
    private _hierarchyInfo: ComponentHierarchyInfo;

    private _authenticationKey: string = ""; //yasar
    private _router : Router;
    private _activatedRoute : ActivatedRoute;
    private _componentFactoryResolver : ComponentFactoryResolver;
    private _changeDetector : ChangeDetectorRef;
    private _dataContextService : DataContextService;

    private _componentHierarchyService: ComponentHierarchyService;

    public panelInstanceRef: IPanelInstanceRef = Object as any; // yasar 

    public globalConstants: IGlobalConstants;

    public authentiticationKeyChangedEvent: EventEmitter<string>;

    //Subscrribers
    private _appConfigSubscription: Subscription; 
    ;
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
        this._dataContext = this.Injector.get<DataContext>(DataContext); // yasar
        this._hierarchyInfo = this.Injector.get<ComponentHierarchyInfo>(ComponentHierarchyInfo); //yasar
        this._appConfigSubscription = this.Injector.get<Subscription>(Subscription);//yasar
        this._settingSubscription = this.Injector.get<Subscription>(Subscription);//yasar


        this.authentiticationKeyChangedEvent = new EventEmitter<string>();
        this.setAuthenticationKey();
        
    }

    public getClassName():string {
        if (this.__componentClassName !=undefined){
            return this.__componentClassName() as string;
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

    get Injector():Injector{
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
        return (this._activatedRoute.root.firstChild as ActivatedRoute).data;
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

    get loadingPanel(): LoadingPanelService{
        return this.Injector.get<LoadingPanelService>(LoadingPanelService);
    }

    @Virtual()
    get Title():string | any{  //yasar   anyı koydun
        if(!this._title){
            return null;
        }

        let tempTitle:string="";
        if(typeof this._title==="string"){
            tempTitle = this._title;
        }else if (typeof this._title==="function"){
            tempTitle = this._title();
        }

        return tempTitle;
    }

    get title():string|Function {
        return this.Title();        
    }

    set title(value:string|Function) {
        this._title = value;        
    }

    get Instance():IComponent {
        return <IComponent>this;        
    }

    get hierarchyInfo():ComponentHierarchyInfo {
        return this._hierarchyInfo;        
    }

    get authonticationKey():string {
        return this._authenticationKey;        
    }

    protected injectOptimal<T>(serviceType: Type<T> | InjectionToken<T>) : T{
        let service : T;
        try {
            service = this.Injector.get<T>(serviceType);
        } catch (error) {
            service = null as any; // yasar burası degıstı    service = null boyleydı
        }
        return service;
    }

    ngOnInit() {
        this._isDestroyed=false;
        this._hierarchyInfo= this._componentHierarchyService.addComponent(this.activatedRoute,this.Instance);

        this.registerAppConfiguration();
        this.registerSetting();

    }

    ngOnDestroy() {
        this._dataContextService.unregister(this.Instance);
        this._componentHierarchyService.removeComponent(this.Instance);

        this.unregisterAppConfiguration();
        this.unregisterSetting();
        this._isDestroyed=true;

    }

    ngAfterViewInit() {

    }

    private setAuthenticationKey():void{
        this.activatedRoute.data.subscribe((data:Data) =>{
            let authenticationService :AuthenticationService =this.Injector.get<AuthenticationService>(AuthenticationService); 
            authenticationService.changeAuthenticationContextType(AuthenticationContextType.Default);
            this.evalusteAuthonticationContextType();
        });
    }

    @Virtual()
    public evalusteAuthonticationContextType():void{}

    private onAuthonticationKeyChanged(authenticationKey:string):boolean{
        let handle:boolean = false;
        if(this.authentiticationKeyChangedEvent.observers.length>0){
            handle = true;
            this.authentiticationKeyChangedEvent.emit(authenticationKey);
        }
        return handle;
    }

    public detectChanges():void{
        if(this.isDestroyed===false){
            this.changeDetector.detectChanges();
        }
    }


    private registerAppConfiguration():void{
        this.unregisterAppConfiguration();
        if ((<any>this).updateConfiguration){
            let configService :ConfigService = this.Injector.get<ConfigService>(ConfigService); 
            this._appConfigSubscription = configService.requestAppConfig().subscribe(appConfig=>{
                let configSubscriber:IConfigSubscriber = (<any>this) as IConfigSubscriber;
                configSubscriber.updateConfiguration(appConfig);
            })
        }
    }

    private unregisterAppConfiguration():void{
        if (this._appConfigSubscription){
            this._appConfigSubscription.unsubscribe();
            this._appConfigSubscription = null as any; // yasar degisrdi   this._appConfigSubscription = null  boyleydı
        }

    }

    private registerSetting():void{
        this.unregisterSetting();
    }

    private unregisterSetting():void{
        if(this._settingSubscription){
            this._settingSubscription.unsubscribe();
            this._settingSubscription = null as any; // yasar degisrdi   this._appConfigSubscription = null  boyleydı
         }  
    }

}
