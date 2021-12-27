import { AfterViewInit, ComponentFactory, ComponentRef, Input, OnDestroy, OnInit, ViewContainerRef } from "@angular/core";
import { AuthenticationService } from "src/app/authentication/authentication.service";
import { BaseComponent } from "./base-component";

@Component({   //yasar sen ekledın
    template: ''
})
export abstract class PageComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit{

    
    @Input()
    pageType: PageType;       

    @Input()
    createPanels:boolean=true;   


    private _popupPanelRef: PopupPanelRef;
    private _popupService: PopupService;
    private _popupOptions: PopupOptions;

    private _authenticationService: AuthenticationService;
    private _embeddedRouterOutletPanelRef: EmbeddedRouterOutletPanelRef;
    private _embeddedRouterOutletService: EmbeddedRouterOutletService;


    constructor(public viewContainerRef:ViewContainerRef){
        super(viewContainerRef);
        this._popupService = this.Injector.get<PopupService>(PopupService);
        this._embeddedRouterOutletPanelRef = this.Injector.get<EmbeddedRouterOutletService>(EmbeddedRouterOutletService);
        this._authenticationService = this.Injector.get<AuthenticationService>(AuthenticationService);

        this._popupOptions = new PopupOptions();
        this.pageType = PageType.Popup;
        
        
    }


    public get popupOptions():PopupOptions{
        return this._popupOptions;
    }

    public get popupService():PopupService{
        return this._popupService;
    }

    public get authenticationService():AuthenticationService{
        return this._authenticationService;
    }


    ngOnInit() {
        super.ngOnInit();
        if (this.useRoute && this.createPanels === true){
            this.createEmbeddedRouterOutletPanel();
            this.createPopupPanel();
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._popupPanelRef){
            this._popupService.removePopupPanel(this._popupPanelRef.Id);
        }
        if (this._embeddedRouterOutletPanelRef){
            this._embeddedRouterOutletService.removeembeddedRouterOutletPanel(this._embeddedRouterOutletPanelRef.Id);
        }
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();         
    }

    private createEmbeddedRouterOutletPanel(){
        let componentFactory : ComponentFactory<EmbeddedRouterOutletPanelComponent> = this._componentFactoryResolver.resolveComponentFactory(EmbeddedRouterOutletPanelComponent);
        let componentRef : ComponentRef<EmbeddedRouterOutletPanelComponent> = this.viewContainerRef.createComponent(componentFactory);
        let componentInstance:EmbeddedRouterOutletPanelComponent =componentRef.instance;
        componentInstance.panelllllType = PanelViewType.Router;
        
    }

    private createPopupPanel(){
        this._popupPanelRef = this._popupService.createPopupPanel(this.viewContainerRef, PanelViewType.Router);
    }

}
