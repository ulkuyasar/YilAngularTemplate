import {  AfterContentInit, Component,  Input, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { ComponentName } from "src/app/core/decorators/component-name";
import { FormComponent } from "src/app/core/components/form-component";
import { DxTemplateDirective, DxTemplateHost, DxTextBoxComponent, IDxTemplateHost, INestedOptionContainer, NestedOptionHost } from "devextreme-angular";
import { DxiItemComponent } from "devextreme-angular/ui/nested";
import { GridViewComponent } from "../grid-view/grid-view.component";
import { ListComponent } from "src/app/core/components/list-component";
import { FilterModel } from "src/app/core/models/filter-model";
import { EventEmitter } from "stream";
import DevExpress from "devextreme";
import { Override } from "src/app/core/decorators/override";
import { QueryStringParam } from "src/app/core/data/query-string-param";
import { IGridView } from "../igrid-view";
import { DataSourceOptions } from "src/app/core/data/data-source-options";
import { AuthenticationService } from "src/app/authentication/authentication.service";
import { ConfigService } from "src/app/config/config.service";
import { User } from "src/app/models/user";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
@ComponentName(FooterComponent,"FooterComponent")
export class FooterComponent extends FormComponent implements OnInit,OnDestroy{
 
   UserName:string;
   CopyrightText:string;

  

   constructor(private auth : AuthenticationService, private config:ConfigService, viewContainerRef:ViewContainerRef){
         super(viewContainerRef);
         
         this.auth.currentUserChangedEvent.subscribe((user:User)=>{
            this.UserName = user.user_name;
         })

   }
  
   
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
