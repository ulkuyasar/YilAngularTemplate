import { AfterViewInit, Component, EventEmitter, Injector,  OnDestroy, OnInit, Output, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { ComponentName } from "src/app/core/decorators/component-name";
import { FormComponent } from "src/app/core/components/form-component";
import { AuthenticationService } from "src/app/authentication/authentication.service";
import { ConfigService } from "src/app/config/config.service";
import { User } from "src/app/models/user";
import { BaseComponent } from "src/app/core/components/base-component";
import { IConfigSubscriber } from "src/app/config/iconfig-subscriber";
import { MenuItem } from "./menu-item";
import { StorageService } from "src/app/storage/storage-service";
import { AppConfig } from "src/app/config/app.config";
import { logoImageProfileAccount, logoImageTopMenu } from "./menu-images";
import { ITreeViewComponent } from "src/app/devextreme/interfaces/tree-view/itree-view-component";
import { ITreeViewEventArgs } from "src/app/devextreme/interfaces/tree-view/itree-view-event-args";
import { AuthenticationContextType } from "src/app/authentication/authentication-context-type";
import { AuthenticationConstants } from "src/app/authentication/authentication-constants";
import { PopupOptions } from "../popup/popup-options";
import { PopupService } from "../popup/popup-service";
import { numberFormatter } from "globalize";
import { MenuService } from "./menu.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  encapsulation:ViewEncapsulation.None
})
@ComponentName(MenuComponent,"MenuComponent")
export class MenuComponent extends BaseComponent implements OnInit,OnDestroy,AfterViewInit,IConfigSubscriber{
 

  @Output('onCollapse')
  collapseEvent: EventEmitter<boolean>;

   imageSourceProfile:string;
   imageSourceMenu:string;
   appVisibleVersion:string;
   commercialTitle:string;
   templateKey:string;
   user:User;
   userName:string;
   userAvatar:string;
   menuItems:MenuItem[]=[];

   public showActionMenu:boolean=true;
   public isActionMenuVisible:boolean=false;
   public collapseState:boolean=false;

   private _isActionMenuHieratchical:boolean=false;

   constructor(injector: Injector,
        private _menuService:MenuService,
        private _authenticationService:AuthenticationService,
        private _storageService:StorageService, 
        viewContainerRef:ViewContainerRef){
         super(viewContainerRef);
         this.collapseEvent = new EventEmitter<boolean>();
         this.setUser(this._authenticationService.currentUser);
         this._authenticationService.currentUserChangedEvent.subscribe((user:User)=>{
           this.setUser(user);
         });
         this.templateKey = "default";
         
         this._storageService = injector.get<StorageService>(StorageService);

   }

   public get menu():MenuItem[]{
     return this.menuItems;
   }


   public get actionMenu():MenuItem[]{
    return [];
  }

  private setUser(user:User):void{
    this.user=user;
    if (this.user){
      this.userName = this.user.first_name==null?this.user.user_name: this.user.first_name+ ' '+ this.user.surname;
      if(this.user.registerId){
        this.userName=this.userName+" - "+this.user.registerId;
      }
      this.userAvatar = this.userName.split(/\s/).reduce((responce,word)=>responce+=word.slice(0,1),'');
    }else{
      this.userName="";
      this.userAvatar="";

    }
  }

  public updateConfiguration(appConfig: AppConfig): void {
      this.appVisibleVersion = appConfig.AppVisibleVersion;
      this.commercialTitle = appConfig.CommercialTitle;
      this.templateKey = appConfig.TemplateKey;
      this.loadImages();
  }

  private loadImages():void{
    this.imageSourceProfile = this.getImagePath(logoImageProfileAccount);
    this.imageSourceMenu = 'assets/img/logo/'+ this.templateKey+'/'+logoImageTopMenu;

  }

  private getImagePath(sourcePath:string):string{
    return 'assets/img/logo/'+ this.templateKey+'/'+sourcePath;

  }


  private menuItemClick(event:ITreeViewEventArgs<MenuItem>,menuItems:MenuItem[]){
    if(this.hasChildren(event.itemData,menuItems)){
      if (event.node.expanded){
        event.component.collapseItem(event.node.key);
      }else{
        event.component.expandItem(event.node.key);
      }
    }else{
      this._authenticationService.changeAuthenticationContextType(AuthenticationContextType.Default);
      let user = this._authenticationService.currentUser;
      let shouldRefreshToken = true;
      if(user){
        let now = new Date().getTime()/1000;
        shouldRefreshToken = (now>user.exp);
      }

      if(shouldRefreshToken){
        this._storageService.removeItem(AuthenticationConstants.ACCESSTOKEN);
        this._authenticationService.firstLogin();
      }

      if (typeof event.itemData.Action === "string"){
        this.router.navigate([event.itemData.Action]);
        this.collapseSideBar();
      }else{
        event.itemData.Action();
      }
    }
  }

  private findItemListOfItem(item:MenuItem):MenuItem[]{
    if(item.items != null){
      if (item.items.length>0){
        return item.items;
      }
    }
    return this.menu;
  }

  handlePropertyChange(e):void{
    if(e.name === "searchValue" && e.Value === ""){
      e.component.collapseAll();
    }
  }

  mainMenuItemClick(event:ITreeViewEventArgs<MenuItem>){
    let items:MenuItem[] = this.findItemListOfItem(event.itemData);
    this.menuItemClick(event,items);
  }

  actionMenuItemClick(event:ITreeViewEventArgs<MenuItem>){  
    this.mainMenuItemClick(event);
  }

  logout(){
    this.collapseSideBar();
  }

  toggleActionMenu(){
    this.isActionMenuVisible = !this.isActionMenuVisible;
  }

  collapseSideBar(){
    this.collapseState = !this.collapseState;
    this.onCollapse(this.collapseState);
  }

  goHome(){
    this.router.navigate(['main']);
  }

  openReleaseNotes():void{
    let popupOptions : PopupOptions = new PopupOptions({
      Title :this.localization.getMessage('releass.title'),
      Position:{ my:'center',at:'center',of:window},
      Height:"900",
      Width:"850" 
    });
    let popupService : PopupService = this.Injector.get<PopupService>(PopupService);
   //   popupService.openGlobalPopupWithComponentType(ReleaseNotesComponent,popupOptions);
  }

  private onCollapse(args:boolean):boolean{
    let handled:boolean=false;
      if (this.collapseEvent.observers.length >0){
        handled = true;
        this.collapseEvent.emit(args);
      }
      return handled;

  }

  private hasChildren(menuItem:MenuItem,items:MenuItem[]){
    if (this._isActionMenuHieratchical){
      return menuItem && menuItem.items.length>0;
    }
    return items.filter(item=>menuItem.MenuKey === item.ParentMenuKey).length;

  }

  private remove = function(array,predicate){
    for (let i = 0; i < array.length; i++) {
      if(predicate(array[i])){
          return array.splice(i,1);
      }
    } 
  }
   
   ngOnInit(): void {
       super.ngOnInit();

       let currentAuthenticationContextType = this._authenticationService.currentAuthenticationContextType;
       this._authenticationService.changeAuthenticationContextType(AuthenticationContextType.Default);
       this._authenticationService.changeAuthenticationContextType(currentAuthenticationContextType);

      this._menuService.getMenuItemSource().subscribe((menuItemsModule : {default:MenuItem[]})=>{
        this.menuItems = menuItemsModule.default;
        if(!this._authenticationService.hasScreen(200)) //200 olmayanlara gozukme
        {
          this.remove(this.menuItems,(row:{Id:number}) => row.Id == 7.3);
          this.remove(this.menuItems,(row:{Id:number}) => row.Id == 7.5);

        }
        if (!this._authenticationService.hasRole("Beamer"))
        {
          this.remove(this.menuItems,(row:{Id:number}) => row.Id == 2);
        }

      })

   }

  ngOnDestroy(): void {
      super.ngOnDestroy();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

}
