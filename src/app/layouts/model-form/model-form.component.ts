import { typeWithParameters } from "@angular/compiler/src/render3/util";
import { AfterContentInit, AfterViewInit, Component, ContentChildren, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChild, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import DevExpress from "devextreme";
import { DxTemplateDirective, DxTemplateHost, IDxTemplateHost, INestedOptionContainer, NestedOptionHost } from "devextreme-angular";
import { DxiItemComponent, DxiValidationRuleComponent } from "devextreme-angular/ui/nested";
import { FormComponent } from "src/app/core/components/form-component";
import { IModelComponent } from "src/app/core/components/imodel-component";
import { ErrorMessage } from "src/app/core/data/error-message";
import { ErrorSource } from "src/app/core/data/error-source.enum";
import { ComponentName } from "src/app/core/decorators/component-name";
import { Override } from "src/app/core/decorators/override";
import { Model } from "src/app/core/models/model";
import { ModelActionType } from "src/app/core/models/model-action-type.enum";
import { ModelAfterActionEventArgs } from "src/app/core/models/model-after-action-event-args";
import { ModelAfterActionType } from "src/app/core/models/model-after-action-type.enum";
import { ModelBeforeActionEventArgs } from "src/app/core/models/model-before-action-event-args";
import { ModelOperation } from "src/app/core/models/model-operation.enum";
import { ModelValidationStatus } from "src/app/core/models/model-validation-status.enum";
import { DeleteConfirmComponent } from "../delete-confirm/delete-confirm.component";
import { PopupOptions } from "../popup/popup-options";
import { PopupRef } from "../popup/popup-ref";
import { PopupService } from "../popup/popup-service";


@Component({
  selector: 'app-model-form',
  templateUrl: './model-form.component.html',
  styleUrls: ['./model-form.component.css'],
  providers:[NestedOptionHost,DxTemplateHost],
  encapsulation:ViewEncapsulation.None
  
})
@ComponentName(ModelFormComponent,"ModelFormComponent")
export class ModelFormComponent extends FormComponent implements OnInit,OnDestroy,AfterViewInit,AfterContentInit,INestedOptionContainer,IDxTemplateHost{
    
   getSizeQualifier(width:number){
      if(width<960) return "xs";
      if(width<1366) return "sm";
      if(width<1600) return "md";
      return "lg";
   }

   @ViewChild('itemsHost',{static:false})
   itemsHost:DxiItemComponent;

   @ContentChildren(DxiItemComponent,{descendants:true})
   allNestedItems:QueryList<DxiItemComponent>;

   @Input('validationGroup')
   validationGroup:string;

   @Input('showValidationSummary')
   showValidationSummary:boolean;

   @Input()
   items:Array<DevExpress.ui.dxFormSimpleItem | DevExpress.ui.dxFormGroupItem | DevExpress.ui.dxFormTabbedItem |
                    DevExpress.ui.dxFormEmptyItem | DevExpress.ui.dxFormButtonItem>;

    @Output('onBeforeAction')
    beforeActionEvent = new EventEmitter<ModelBeforeActionEventArgs>();

    @Output('onAfterAction')
    afterActionEvent = new EventEmitter<ModelAfterActionEventArgs>();

    @Output('onClosePanel')
    closePanelEvent = new EventEmitter<void>();

    public _templates: DxTemplateDirective[] = new Array<DxTemplateDirective>();

    parentModelComponent:IModelComponent;
    private _modelOperation:ModelOperation;
    private _isModal: boolean;

    modelOperationChangedEvent: EventEmitter<ModelOperation>;
    modelLoadingEvent: EventEmitter<Model>;
    modelLoadedEvent: EventEmitter<Model>;

    private _afterCreateActionType: ModelAfterActionType;
    private _afterUpdateActionType: ModelAfterActionType;
    private _afterDeleteActionType: ModelAfterActionType;
    private _afterOkActionType: ModelAfterActionType;

    private _tempAfterCreateActionType: ModelAfterActionType;

    private _popupService:PopupService;
    private _requiredItemRuleMap: Map<string,DxiValidationRuleComponent>;
    private _requiredItemMap: Map<string,DxiItemComponent>;


   constructor(private nestedOptionHost:NestedOptionHost,private templateHost:DxTemplateHost,viewContainerRef:ViewContainerRef){
        super(viewContainerRef);
        this.nestedOptionHost.setHost(this);
        this.templateHost.setHost(this);

        this._requiredItemRuleMap = new Map<string,DxiValidationRuleComponent>();
        this._requiredItemMap = new Map<string,DxiItemComponent>();

        this.modelOperationChangedEvent= new EventEmitter<ModelOperation>();
        this.modelLoadingEvent= new  EventEmitter<Model>();
        this.modelLoadedEvent= new  EventEmitter<Model>();

        this.setAfterCreateActionType(ModelAfterActionType.ClosePanel);
        this.setAfterUpdateActionType(ModelAfterActionType.ClosePanel);
        this.setAfterDeleteActionType(ModelAfterActionType.ClosePanel);
        this.setAfterOkActionType(ModelAfterActionType.ClosePanel);

        this._modelOperation = ModelOperation.None;
        this._isModal = false;
        this._popupService = this.Injector.get<PopupService>(PopupService);
        this.validationGroup = this.componentID;
        this.showValidationSummary = false;
        this.readOnly = false;
    }

    get instance(): DevExpress.ui.dxForm{
       return this.form.instance;
    }

    get isLinked():boolean{
      return this.form.isLinked; 
    }

    get optionChangedHandlers():EventEmitter<any>{
      return new EventEmitter<any>();
    }

    setTemplate(template: DxTemplateDirective){
      this._templates.push(template);
    }

    ngOnInit(): void {
      super.ngOnInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    ngAfterViewInit(): void {
      super.ngAfterViewInit();
    }

    ngAfterContentInit(){
       this.configureItems();
       this.configureTemplates();
       this.configureValidations();

    }

    public get modelOperation():ModelOperation{
      return this._modelOperation;
    }

    public set modelOperation(operation: ModelOperation){
      this._modelOperation = operation;
      if (operation == ModelOperation.View){
        this.form.readOnly = true;
      }
      this.modelOperationChangedEvent.emit(operation);
    }

    public get isModal():boolean{
      return this._isModal;
    }

    public set isModal(ismodel: boolean){
      this._isModal = ismodel;
    }

    public setAfterCreateActionType(afterActionType:ModelAfterActionType){
      if (afterActionType === ModelAfterActionType.ContinueCreate){
        return;
      }
      this._afterCreateActionType = afterActionType;
      this._tempAfterCreateActionType = this._afterCreateActionType;

    }

    public setAfterUpdateActionType(afterActionType:ModelAfterActionType){
      if (afterActionType === ModelAfterActionType.ContinueCreate){
        return;
      }
      this._afterUpdateActionType = afterActionType;

    }

    public setAfterDeleteActionType(afterActionType:ModelAfterActionType){
      if (afterActionType === ModelAfterActionType.ContinueCreate){
        return;
      }
      this._afterDeleteActionType = afterActionType;

    }

    public setAfterOkActionType(afterActionType:ModelAfterActionType){
      if (afterActionType === ModelAfterActionType.ContinueCreate){
        return;
      }
      this._afterOkActionType = afterActionType;

    }

    private configureItems():void{

      if (this.itemsChildren && this.itemsChildren.length >0){
        this.form.itemsChildren = this.itemsChildren;
      }else{
        this.form.items = this.items;
      }
      Object.defineProperties(this.form,"itemsChildren", { writable : true });
    }

    private configureTemplates():void{
      
       if (this._templates){
         this._templates.forEach(template=>{
            this.form.templates.push(template);
         });
       }
    }

    private configureValidations():void{
      let validatedDataFieldItems : DxiItemComponent[] = this.allNestedItems.filter(item => item.dataField!=null && (item.validationRules && item.validationRules.length>0) || )
    
      validatedDataFieldItems.forEach(item =>{
        if (item.dataField){
          item.validationRulesChildren.forEach(rule=>{
            if (rule.type === "required"){
              this._requiredItemRuleMap.set(item.dataField,rule);
              this._requiredItemMap.set(item.dataField,item);

            }
          });
        }
      });
    }


    @Override()
    public model(): object {
        return this.dataContext.dataSource;
    }

    public fillSelectBox(dataField:string,dataSource:DevExpress.data.DataSource,reset:boolean)
    {
      let selectBox: DevExpress.ui.dxSelectBox = this.form.instance.getEditor(dataField);
      if (selectBox){
        selectBox.option('dataSource',dataSource);
        if (reset){
          selectBox.reset();
        }
      }
    }

    public fillDropDownBox(dataField:string,dataSource:DevExpress.data.DataSource,reset:boolean)
    {
      let dropDownBox: DevExpress.ui.dxDropDownBox = this.form.instance.getEditor(dataField);
      if (dropDownBox){
        dropDownBox.option('dataSource',dataSource);
        if (reset){
          dropDownBox.reset();
        }
      }
    }

    public clearForm():void{
      this.parentModelComponent.cleanModel();
      this.clear(false);
    }

    public refreshForm():void{
      this.parentModelComponent.getModel();
    }

    public createModel(continueCreate:boolean):void{
      this._afterCreateActionType = continueCreate ? ModelAfterActionType.ContinueCreate : this._tempAfterCreateActionType;
      this.modelAction(ModelActionType.Create,this._createModel)
    }

    public copyModel():void{
      this.modelAction(ModelActionType.Copy,this._copyModel)
    }

    public updateModel():void{
      this.modelAction(ModelActionType.Update,this._updateModel)
    }

    public deleteModel():void{
      let popupOptions: PopupOptions = new PopupOptions({
        Width:400,
        ShowTitle:false,
        ShowCloseButton:false,
        DragEnabled:false,
        Position:{my:'center',at:'center',of:window}

      });

      let afterDeleteConfimationCreate = (componentInstance:DeleteConfirmComponent) =>{
        componentInstance.confirmationText = this.localization.getMessage('delete.confirmanation.text');
      }
      let popupRef: PopupRef<DeleteConfirmComponent> = this._popupService.openGlobalPopupWithComponentType(DeleteConfirmComponent,popupOptions,afterDeleteConfimationCreate)
      popupRef.afterClosed().subscribe((returnValue:boolean) => {
        if(returnValue === true){
          this.modelAction(ModelActionType.Delete,this._deleteModel);
        }
      });
   }



public okModel():void{
  let modelActionType: ModelActionType;
  if(this.modelOperation === ModelOperation.New){
    modelActionType = ModelActionType.Create;
  }else if (this.modelOperation === ModelOperation.Edit){
    modelActionType = ModelActionType.Update;
  }
  this.modelAction(modelActionType,this._okModel);
}

  public checkRequiredItems(model:Model):boolean{
    let isOk :boolean =true;
    this._requiredItemRuleMap.forEach((rule,dataField) =>{
      let item:DxiItemComponent = this._requiredItemMap.get(dataField);
      let visible:Boolean = true;
      if (item){
        let editor = this.form.instance.getEditor(dataField);
        if(editor && editor._options){
          if (editor._options.visible === false){
            visible = false;
          }
        }
      }
      let path:string[] =dataField.split('.');
      let value = this.getValue(path,0,model);
      if(value==null&&visible===true){
        isOk=false;
        console.warn("DataField:"+dataField+" value:"+value+ " visible:"+visible);
      }
    });
    return isOk;
  }

  private getValue(path:string[],level:number,data:any){
    let propertyName:string = path[level];
    let entries : [string,any][] = Object.entries(data).filter(entry => entry[0] === propertyName);
    if (entries.length >0){
      let entry :  [string,any][] = entries[0];
      if(level===path.length-1){
        return entry[1];
      }
      return this.getValue(path,level+1,entry[1]);
    }
    return null;
  }

  private validateModel():ModelValidationStatus{
    if (this.form.validationGroup{
      let validationResult : DevExpress.ui.dxValidationGroupResult = this.form.instance.validate();
      if(!validationResult){
        return ModelValidationStatus.Valid;
      }else if (validationResult && validationResult.isValid){
        return ModelValidationStatus.Valid;
      }else{
        return ModelValidationStatus.InValid;
      }
    }
    return ModelValidationStatus.NoValidation;
  }

  private modelAction(actionType:ModelActionType,action:(that:ModelFormComponent) =>void, actionWhenInvalid?: (that:ModelFormComponent)=>void):void{
    let validationStatus :ModelValidationStatus = this.validateModel();
    let beforeActionEventArgs:ModelBeforeActionEventArgs = new ModelBeforeActionEventArgs(actionType,validationStatus);
    this.onBeforeAction(beforeActionEventArgs);

    switch(validationStatus){
      case ModelValidationStatus.NoValidation:
      case ModelValidationStatus.Valid:
        if(beforeActionEventArgs.beforeAction){
          beforeActionEventArgs.beforeAction.subscribe(
            () => {
              if(beforeActionEventArgs.cancel === false){
                action(this);
              }
            },
            (error)=>{
              this.event.toastError(error);
            }
          );
        } 
        else{
          if (beforeActionEventArgs.cancel===false){
            action(this);
          }
        }
        break;
        case ModelValidationStatus.InValid:
          if(actionWhenInvalid){
            actionWhenInvalid(this);
          }
          break;
        default;
          break;
    }
  }
  private _createModel(that:ModelFormComponent):void{
    that.loadingPanel.start();
    let afterActionEventArrgs:ModelAfterActionEventArgs;
    that.parentModelComponent.create(that._afterCreateActionType).subscribe(
      (model) => {
        that.loadingPanel.stop();
        afterActionEventArrgs = new ModelAfterActionEventArgs(ModelActionType.Create,true,model);
        that.onAfterAction(afterActionEventArrgs);
        that.event.toastSuccess(that.localization.getMessage('model.created'));
        that.afterCreate();

      },
      (error) =>{
        that.loadingPanel.stop();
        afterActionEventArrgs = new ModelAfterActionEventArgs(ModelActionType.Create,false,null,error);
        that.onAfterAction(afterActionEventArrgs);
        if(error instanceof ErrorMessage){
          ErrorService.errorNotifier.next(error);
        }else{
          that.event.toastError(that.localization.getMessage('model.created.error'));
        }
      }     
      );
   }

   private _copyModel(that:ModelFormComponent):void{
     that.loadingPanel.start();

     let afterActionEventArrgs:ModelAfterActionEventArgs;
     that.parentModelComponent.create(that._afterCreateActionType).subscribe(
       (model) => {
         that.loadingPanel.stop();
         afterActionEventArrgs = new ModelAfterActionEventArgs(ModelActionType.Copy,true,model);
         that.onAfterAction(afterActionEventArrgs);
         that.event.toastSuccess(that.localization.getMessage('model.copied'));
         that.afterCreate();
 
       },
       (error) =>{
         that.loadingPanel.stop();
         afterActionEventArrgs = new ModelAfterActionEventArgs(ModelActionType.Copy,false,null,error);
         that.onAfterAction(afterActionEventArrgs);
         if(error instanceof ErrorMessage){
           ErrorService.errorNotifier.next(error);
         }else{
           that.event.toastError(that.localization.getMessage('model.copied.error'));
         }
       }     
       );
   }

   private _updateModel(that:ModelFormComponent):void{
    that.loadingPanel.start();

    let afterActionEventArrgs:ModelAfterActionEventArgs;
    that.parentModelComponent.create(that._afterCreateActionType).subscribe(
      (model) => {
        that.loadingPanel.stop();
        afterActionEventArrgs = new ModelAfterActionEventArgs(ModelActionType.Update,true,model);
        that.onAfterAction(afterActionEventArrgs);
        that.event.toastSuccess(that.localization.getMessage('model.copied'));
        that.afterUpdate();

      },
      (error) =>{
        that.loadingPanel.stop();
        afterActionEventArrgs = new ModelAfterActionEventArgs(ModelActionType.Update,false,null,error);
        that.onAfterAction(afterActionEventArrgs);
        if(error instanceof ErrorMessage){
          ErrorService.errorNotifier.next(error);
        }else{
          that.event.toastError(that.localization.getMessage('model.copied.error'));
        }
      }     
      );
  }

  private _deleteModel(that:ModelFormComponent):void{
    that.loadingPanel.start();

    let afterActionEventArrgs:ModelAfterActionEventArgs;
    that.parentModelComponent.create(that._afterCreateActionType).subscribe(
      (model) => {
        that.loadingPanel.stop();
        afterActionEventArrgs = new ModelAfterActionEventArgs(ModelActionType.Delete,true,model);
        that.onAfterAction(afterActionEventArrgs);
        that.event.toastSuccess(that.localization.getMessage('model.copied'));
        that.afterDelete();

      },
      (error) =>{
        that.loadingPanel.stop();
        afterActionEventArrgs = new ModelAfterActionEventArgs(ModelActionType.Delete,false,null,error);
        that.onAfterAction(afterActionEventArrgs);
        if(error instanceof ErrorMessage){
          ErrorService.errorNotifier.next(error);
        }else{
          that.event.toastError(that.localization.getMessage('model.copied.error'));
        }
       }     
      );
  }

  private _okModel(that:ModelFormComponent):void{
    let modelActionType:ModelActionType;
    let successMessage:string;
    let errorMessage:string;
    if(that.modelOperation === ModelOperation.New){
      modelActionType = ModelActionType.Create;
      successMessage = "model.created";
      errorMessage = "model.created.error";

    }else if (that.modelOperation === ModelOperation.Edit){
      modelActionType = ModelActionType.Update;
      successMessage = "model.updated";
      errorMessage = "model.updated.error";
    }

    that.loadingPanel.start();

    let afterActionEventArrgs:ModelAfterActionEventArgs;
    that.parentModelComponent.create(that._afterCreateActionType).subscribe(
      (model) => {
        that.loadingPanel.stop();
        afterActionEventArrgs = new ModelAfterActionEventArgs(modelActionType,true,model);
        that.onAfterAction(afterActionEventArrgs);
        that.event.toastSuccess(successMessage);
        that.afterOK();

      },
      (error) =>{
        that.loadingPanel.stop();
        afterActionEventArrgs = new ModelAfterActionEventArgs(modelActionType,false,null,error);
        that.onAfterAction(afterActionEventArrgs);
        if(error instanceof ErrorMessage){
          ErrorService.errorNotifier.next(error);
        }else{
          that.event.toastError(errorMessage);
        }
      }     
      );
  }

  private closePanel():void{
    if(this.parentModelComponent && this.parentModelComponent.panelInstanceRef){
      this.parentModelComponent.panelInstanceRef.close();
    }
  }

  private afterCreate():void{
    switch(this._afterCreateActionType){
      case ModelAfterActionType.ClosePanel:
        this.clearForm();
        this.closePanel();
        break;
      case ModelAfterActionType.ContinueCreate:
        this.clearForm();
        break;
      case ModelAfterActionType.GotoEdit:
        this.clearForm();
        if (this.parentModelComponent.useRoute){
          this.parentModelComponent.changeOperation(ModelOperation.Edit);
        } else {
          this.parentModelComponent.changeOperation(ModelOperation.Edit);
        }
        break;
      case ModelAfterActionType.Nothing:
        break;
      default:
        break;

    }
  }

  private afterUpdate():void{
    switch(this._afterUpdateActionType){
      case ModelAfterActionType.ClosePanel:
        this.clearForm();
        this.closePanel();
        break;
      case ModelAfterActionType.ContinueCreate:
        //Invalid for update
        break;
      case ModelAfterActionType.GotoEdit:
        //Invalid for update
        break;
      case ModelAfterActionType.Nothing:
        break;
      default:
        break;
    }
  }

  private afterDelete():void{
    switch(this._afterDeleteActionType){
      case ModelAfterActionType.ClosePanel:
        this.clearForm();
        this.closePanel();
        break;
      case ModelAfterActionType.ContinueCreate:
        //Invalid for delete
        break;
      case ModelAfterActionType.GotoEdit:
        //Invalid for delete
        break;
      case ModelAfterActionType.Nothing:
        break;
      default:
        break;
    }
  }


  private afterOK():void{
    switch(this._afterOkActionType){
      case ModelAfterActionType.ClosePanel:
        this.clearForm();
        this.closePanel();
        break;
      case ModelAfterActionType.ContinueCreate:
        //Invalid for delete
        break;
      case ModelAfterActionType.GotoEdit:
        //Invalid for delete
        break;
      case ModelAfterActionType.Nothing:
        break;
      default:
        break;
    }
  }

  onBeforeAction(args:ModelBeforeActionEventArgs):boolean{
    let handled:boolean = false;
    if(this.beforeActionEvent.observers.length>0){
      handled = true;
      this.beforeActionEvent.emit(args);
    }
    return handled;
  }

  onAfterAction(args:ModelAfterActionEventArgs):boolean{
    let handled:boolean = false;
    if(this.afterActionEvent.observers.length>0){
      handled = true;
      this.afterActionEvent.emit(args);
    }
    return handled;
  }

  onClosePanel():boolean{
    let handled:boolean = false;
    if(this.closePanelEvent.observers.length>0){
      handled = true;
      this.closePanelEvent.emit();
    }
    return handled;
  }

  onModelLoading(model:Model):boolean{
    let handled:boolean = false;
    if(this.modelLoadingEvent.observers.length>0){
      handled = true;
      this.modelLoadingEvent.emit(model);
    }
    return handled;
  }

  onModelLoaded(model:Model):boolean{
    let handled:boolean = false;
    if(this.modelLoadedEvent.observers.length>0){
      handled = true;
      this.modelLoadedEvent.emit(model);
    }
    return handled;
  }

}