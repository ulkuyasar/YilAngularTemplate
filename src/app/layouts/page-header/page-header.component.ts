import {  Component,  Input, OnDestroy, OnInit, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "src/app/authentication/authentication.service";
import { BaseComponent } from "src/app/core/components/base-component";
import { ComponentName } from "src/app/core/decorators/component-name";

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css'],
  encapsulation:ViewEncapsulation.None
})
@ComponentName(PageHeaderComponent,"PageHeaderComponent")
export class PageHeaderComponent extends BaseComponent implements OnInit,OnDestroy{
    
  
  @Input('content')
  content:string | Function;

    
  @Input('imageSource')
  imageSource:string | Function;

  @Input('showContent')
  showContent:boolean;

  @Input('isCollapsed')
  isCollapsed:boolean;

  @Input('showImage')
  showImage:boolean;

  docUrl:any;
  urlPathData:string;
  urlPath:string;
  urlTrimmed:string;
  docLicenceType:string;

  public collapseDocPanelState:boolean=false;


  constructor(viewContainerRef:ViewContainerRef, private _authenticationService:AuthenticationService,route:ActivatedRoute,router:Router ){
    super(viewContainerRef);
    this.showContent=true;
    this.isCollapsed=true;
    this.showImage=true;
    this.urlPathData=router.url;
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnDestroy(): void {
      super.ngOnDestroy();
  }

  collapseDocPanel(): void {

    this.collapseDocPanelState = !this.collapseDocPanelState;
    this.docUrl = 'asset/documents'+this.urlPathData+'/'+this.docLicenceType+'.md';
  }

  scrollHeight():number{
    return window.innerHeight/1;
  }


}