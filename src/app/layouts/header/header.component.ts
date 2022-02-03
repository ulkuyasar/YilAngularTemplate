import {  Component,  OnDestroy, OnInit, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { ComponentName } from "src/app/core/decorators/component-name";
import { FormComponent } from "src/app/core/components/form-component";
import { AuthenticationService } from "src/app/authentication/authentication.service";
import { ConfigService } from "src/app/config/config.service";
import { User } from "src/app/models/user";
import { BaseComponent } from "src/app/core/components/base-component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation:ViewEncapsulation.None
})
@ComponentName(HeaderComponent,"HeaderComponent")
export class HeaderComponent extends BaseComponent implements OnInit,OnDestroy{

   constructor( viewContainerRef:ViewContainerRef){
         super(viewContainerRef);
   }


   ngOnInit(): void {
       super.ngOnInit();

       this.rootData.subscribe(data=>{
         this.title = data.WellcomeMessage;
       })
   }

  ngOnDestroy(): void {
      super.ngOnDestroy();
  }

}
