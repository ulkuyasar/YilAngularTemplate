import { AfterViewInit, Component, EventEmitter, Injector, Injector, OnDestroy, OnInit, Output, ViewContainerRef, ViewEncapsulation } from "@angular/core";
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


  yasar   menuıtem click













  
   
   ngOnInit(): void {
       super.ngOnInit();

       this.CopyrightText = this.config.appConfig.CopyrightText;
       if(this.auth.currentUser){
         this.UserName = this.auth.currentUser.user_name;
       }   
   }

  ngOnDestroy(): void {
      super.ngOnDestroy();
  }

}
