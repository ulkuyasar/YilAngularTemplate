import {  AfterViewInit, Component,  EventEmitter, Input, OnDestroy, OnInit, Output, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { Subscription } from "rxjs";
import { BaseComponent } from "src/app/core/components/base-component";
import { ComponentName } from "src/app/core/decorators/component-name";
import { EntityOperation } from "src/app/core/models/entity-operation.enum";
import { Model } from "src/app/core/models/model";
import { ModelOperation } from "src/app/core/models/model-operation.enum";
import { ModelFormComponent } from "../model-form/model-form.component";

@Component({
  selector: 'app-model-form-actions',
  templateUrl: './model-form-actions.component.html',
  styleUrls: ['./model-form-actions.component.css'],
  encapsulation:ViewEncapsulation.None
})
@ComponentName(ModelFormActionsComponent,"ModelFormActionsComponent")
export class ModelFormActionsComponent extends BaseComponent implements OnInit,OnDestroy,AfterViewInit{
    
  @Input()
  modelForm:ModelFormComponent;

  @Input()
  allowCreate:boolean=true;
  
  @Input()
  createButtonText:string='model.form.actions.createbutton.text';

  @Input()
  createButtonIcon:string='save';

  @Input()
  allowContinueCreate:boolean=false;

  @Input()
  continueCreate:boolean=true;

  @Input()
  continueButtonText:string='model.form.actions.continuecreate.text';


  
  @Input()
  allowCopy:boolean=true;

  @Input()
  copyButtonText:string='model.form.actions.copybutton.text';

  
  @Input()
  copyButtonIcon:string='copy';



  @Input()
  allowUpdate:boolean=true;

  @Input()
  updateButtonText:string='model.form.actions.editbutton.text';

  @Input()
  updateButtonIcon:string='save';



  
  @Input()
  allowDelete:boolean=true;

  @Input()
  deleteButtonText:string='model.form.actions.deletebutton.text';

  @Input()
  deleteButtonIcon:string='icon icon-delete icon-16px';

  @Input()
  allowOk:boolean=true;

  @Input()
  okButtonText:string='model.form.actions.okbutton.text';

  @Input()
  okButtonIcon:string='check';




  @Input()
  allowClear:boolean=true;

  @Input()
  clearButtonText:string='model.form.actions.clearbutton.text';

  @Input()
  clearButtonIcon:string='clear';



  @Input()
  allowRefresh:boolean=true;

  @Input()
  refreshButtonText:string='model.form.actions.refreshbutton.text';

  @Input()
  refreshButtonIcon:string='icon icon-sync icon-16px';



  @Input()
  isLastUpdateDateEnabled:boolean=true;

  @Input()
  overrideActionVisibility:boolean=false;


  @Output('onCreateButtonClick')
  createButtonClickEvent = new EventEmitter<any>();

  @Output('onCopyButtonClick')
  copyButtonClickEvent = new EventEmitter<any>();

  @Output('onUpdateButtonClick')
  updateButtonClickEvent = new EventEmitter<any>();

  @Output('onDeleteButtonClick')
  deleteButtonClickEvent = new EventEmitter<any>();

  @Output('onOkButtonClick')
  okButtonClickEvent = new EventEmitter<any>();

  private modelOperationChangedSubscription:Subscription;
  private modelLoadedSubscription:Subscription;

  isLastUpdateDateVisible:boolean;
  isLastUpdateDateAvailable:boolean;

  constructor(viewContainerRef:ViewContainerRef){
    super(viewContainerRef);
    this.isLastUpdateDateVisible=false;
    this.isLastUpdateDateAvailable=false;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.detectChanges();
  }

  ngOnDestroy(): void {
      super.ngOnDestroy();

      if (this.modelOperationChangedSubscription){
        this.modelOperationChangedSubscription.unsubscribe();
      }

      if (this.modelLoadedSubscription){
        this.modelLoadedSubscription.unsubscribe();
      }
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();

    this.modelOperationChangedSubscription = this.modelForm.modelOperationChangedEvent.subscribe((operation :ModelOperation) =>{
      this.isLastUpdateDateVisible = operation !== ModelOperation.None && operation !== ModelOperation.New;
      this.detectChanges();
    });

    this.modelLoadedSubscription = this.modelForm.modelLoadedEvent.subscribe((model :Model) => {
      this.modelLoaded(model);
      this.detectChanges();
    });
  }

  get isContinueCreateVisible():boolean{
    let isVisible:boolean = true;

    if(this.isCreateButtonVisible === false){
      return false;
    }

    if(this.allowContinueCreate === false){
      return false;
    }

    if(!this.modelForm){
      return false;
    }
    
    if(this.modelForm.isModal){
      return false;
    }

    isVisible = this.modelForm.modelOperation === ModelOperation.New;
    return isVisible;

  }


  get isCreateButtonVisible():boolean{
    let isVisible:boolean = true;

    if(this.allowCreate === false){
      return false;
    }


    if(!this.modelForm){
      return false;
    }
    
    if(this.modelForm.isModal){
      return false;
    }

    isVisible = this.modelForm.modelOperation === ModelOperation.New;
    return isVisible;

  }


  
  get isCopyButtonVisible():boolean{
    let isVisible:boolean = true;

    if(this.allowCopy === false){
      return false;
    }


    if(!this.modelForm){
      return false;
    }
    
    if(this.modelForm.isModal){
      return false;
    }

    isVisible = this.modelForm.modelOperation === ModelOperation.Copy;
    return isVisible;

  }


  
  get isUpdateButtonVisible():boolean{
    let isVisible:boolean = true;

    if(this.allowUpdate === false){
      return false;
    }


    if(!this.modelForm){
      return false;
    }
    
    if(this.modelForm.isModal){
      return false;
    }

    isVisible = this.modelForm.modelOperation === ModelOperation.Edit;
    return isVisible;

  }

  
  get isDeleteButtonVisible():boolean{
    let isVisible:boolean = true;

    if(this.allowDelete === false){
      return false;
    }


    if(!this.modelForm){
      return false;
    }
    
    if(this.modelForm.isModal){
      return false;
    }

    isVisible = this.modelForm.modelOperation === ModelOperation.Edit;
    return isVisible;

  }

  
  get isOKButtonVisible():boolean{
    let isVisible:boolean = true;

    if(this.allowOk === false){
      return false;
    }

    if(!this.modelForm){
      return false;
    }
    
    if(this.modelForm.isModal){
      return false;
    }

    isVisible = this.modelForm.modelOperation === ModelOperation.New || this.modelForm.modelOperation  === ModelOperation.Copy;
    return isVisible;

  }

  isCreateButtonDisabled():boolean{
    let isDisabled:boolean = false;
    if(this.allowCreate===false){
      return true;
    }
    return isDisabled;
  }

  isUpdateButtonDisabled():boolean{
    let isDisabled:boolean = false;
    if(this.allowUpdate===false){
      return true;
    }
    return isDisabled;
  }

  isDeleteButtonDisabled():boolean{
    let isDisabled:boolean = false;
    if(this.allowDelete===false){
      return true;
    }
    return isDisabled;
  }

  
  isOKButtonDisabled():boolean{
    let isDisabled:boolean = false;
    if(this.allowOk===false){
      return true;
    }
    return isDisabled;
  }

  isClearButtonDisabled():boolean{
    let isDisabled:boolean = false;
    if(this.allowClear===false){
      return true;
    }
    return isDisabled;
  }

  isRefreshButtonDisabled():boolean{
    let isDisabled:boolean = false;
    if(this.allowRefresh===false){
      return true;
    }
    return isDisabled;
  }

  createModel(args:any):void{
    if (this.onCreateButtonClick(args)){
      return;
    }
    this._createModel(this.modelForm);

    // if (this.modelForm instanceof Array){
    //   for(const modelFormItem of this.modelForm){
    //     this._createModel(modelFormItem);
    //   }
    // }else{
    //   this._createModel(this.modelForm);
    // }

  }

  copyModel(args:any):void{
    if (this.onCopyButtonClick(args)){
      return;
    }
    this._copyModel(this.modelForm);

    // if (this.modelForm instanceof Array){
    //   for(const modelFormItem of this.modelForm){
    //     this._copyModel(modelFormItem);
    //   }
    // }else{
    //   this._copyModel(this.modelForm);
    // }

  }

  updateModel(args:any):void{
    if (this.onUpdateButtonClick(args)){
      return;
    }
    this._updateModel(this.modelForm);

    // if (this.modelForm instanceof Array){
    //   for(const modelFormItem of this.modelForm){
    //     this._updateModel(modelFormItem);
    //   }
    // }else{
    //   this._updateModel(this.modelForm);
    // }

  }

  deleteModel(args:any):void{
    if (this.onDeleteButtonClick(args)){
      return;
    }
    this._deleteModel(this.modelForm);

  }

  okModel(args:any):void{
    if (this.onOkButtonClick(args)){
      return;
    }
    this._okModel(this.modelForm);

  }

  clearForm(args:any){
    this._clearModel(this.modelForm);
  }

  refreshForm(args:any){
    this._refreshModel(this.modelForm);
  }

  private modelLoaded(model:Model):void{
    //this.setAuditInformation(model);
  }

  private computeAuditModifiyDate(model:Model,entityOperation:EntityOperation):Date{
    switch(entityOperation){
      case EntityOperation.None:
        return model.UpdatedDate==null ||  model.UpdatedDate===undefined ? model.CreatedDate : model.UpdatedDate;
      case EntityOperation.Create:
        return model.CreatedDate;
      case EntityOperation.Update:
        return model.UpdatedDate;
      default:
        break;
    }
    return null;
  }

  private _createModel(modelForm:ModelFormComponent){
    let continueCreate :boolean = this.isContinueCreateVisible && this.continueCreate;
    modelForm.createModel(continueCreate);
  }

  private _copyModel(modelForm:ModelFormComponent){
    modelForm.copyModel();
  }

  private _updateModel(modelForm:ModelFormComponent){
    modelForm.updateModel();
  }

  private _deleteModel(modelForm:ModelFormComponent){
    modelForm.deleteModel();
  }

  private _okModel(modelForm:ModelFormComponent){
    modelForm.okModel();
  }

  private _clearModel(modelForm:ModelFormComponent){
    modelForm.clearForm();
  }

  private _refreshModel(modelForm:ModelFormComponent){
    modelForm.refreshForm();
  }

  onCreateButtonClick(args:any){
    let handled:boolean = false;
    if(this.createButtonClickEvent.observers.length>0){
      handled = true;
      this.createButtonClickEvent.emit(args);
    }
    return handled;
  }

  onCopyButtonClick(args:any){
    let handled:boolean = false;
    if(this.copyButtonClickEvent.observers.length>0){
      handled = true;
      this.copyButtonClickEvent.emit(args);
    }
    return handled;
  }

  onUpdateButtonClick(args:any){
    let handled:boolean = false;
    if(this.updateButtonClickEvent.observers.length>0){
      handled = true;
      this.updateButtonClickEvent.emit(args);
    }
    return handled;
  }

  onDeleteButtonClick(args:any){
    let handled:boolean = false;
    if(this.deleteButtonClickEvent.observers.length>0){
      handled = true;
      this.deleteButtonClickEvent.emit(args);
    }
    return handled;
  }

  onOkButtonClick(args:any){
    let handled:boolean = false;
    if(this.okButtonClickEvent.observers.length>0){
      handled = true;
      this.okButtonClickEvent.emit(args);
    }
    return handled;
  }


}