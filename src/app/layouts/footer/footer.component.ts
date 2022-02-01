import {  Component,  OnDestroy, OnInit, ViewContainerRef } from "@angular/core";
import { ComponentName } from "src/app/core/decorators/component-name";
import { FormComponent } from "src/app/core/components/form-component";
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
