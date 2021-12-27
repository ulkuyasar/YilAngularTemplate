import { SafeMethodCall } from "@angular/compiler";
import { AfterViewInit, ComponentFactory, ComponentRef, getModuleFactory, Input, OnDestroy, OnInit, Output, ViewChildren, ViewContainerRef } from "@angular/core";
import { ParamMap } from "@angular/router";
import { ok } from "assert";
import { ETIME } from "constants";
import { Observable, of } from "rxjs";
import { AuthenticationService } from "src/app/authentication/authentication.service";
import { EventEmitter } from "stream";
import { IReturnValue } from "../component-model/ireturn-value";
import { Virtual } from "../decorators/virtual";
import { Model } from "../models/model";
import { ModelOperation } from "../models/model-operation.enum";
import { ModelTrackingState } from "../models/model-tracking-state.enum";
import { BaseComponent } from "./base-component";
import { IModelComponent } from "./imodel-component";
import { PageComponent } from "./page-component";

@Component({   //yasar sen ekledın
    template: ''
})
export abstract class ModelComponent<T extends Model,TKey =number | string> 
                                       extends PageComponent implements OnInit, OnDestroy, AfterViewInit, IModelComponent, 
                                       IReturnValue<T | Array<T>>{

    @ViewChildren(ModelFormComponent)
    modelForm:QueryList<ModelFormComponent>;
    
    @Input()
    model: T;       

    @Input('isValidationEnableOnCreate')
    isValidationEnableOnCreate:boolean;   

    @Input('isValidationEnableOnUpdate')
    isValidationEnableOnUpdate:boolean; 

    @Input('isValidationEnableOnDelete')
    isValidationEnableOnDelete:boolean; 


    @Output('onModelLoading')
    modelLoadingEvent:EventEmitter<T>;
    
    
    @Output('onModelLoaded')
    modelLoadedEvent:EventEmitter<T>;

    returnValue: T | Array<T>


    beforeModelLoaded: (model:T) => Observable<T>;
    beforeExecuteOperation: (operation:ModelOperation) => Observable<ModelOperation>;

    protected _modelService: IModelService<T,TKey>;

    private _modelState:ModelState;
    private _modelOperation:ModelOperation;
    private _isModal:boolean;
    private _modelSource:ModelSource;
    private _modelID:TKey;


    constructor(modelService,IModelService<T,TKey>,viewContainerRef ViewContainerRef){
        super(viewContainerRef);

        this.modelLoadingEvent = new EventEmitter<T>();
        this.modelLoadedEvent = new EventEmitter<T>();

        this.isValidationEnableOnCreate = true;
        this.isValidationEnableOnUpdate = true;
        this.isValidationEnableOnDelete = false;

        this.modelLoadedEvent.subscribe((model:T) =>{
            this.popupOperations.Title = this.getPopupTitle(model,this.modelOperation);
            if (this.panelInstanceRef){
                this.panelInstanceRef.updateTitle(this.popupOptions.Title);
            }
        });

        this._modelService = modelService;
        this._modelState = ModelState.None;
        this._isModal = false;
        this._modelSource = ModelSource.Api;
    }
    
    public get modelID():TKey{
        return this._modelID;
    }

    public set modelID(id:TKey){
        return this._modelID = id;
    }

    public get modelOperation():ModelOperation{
        return this._modelOperation;
    }

    public get isModel():boolean{
        return this._isModel;
    }

    public get modelState(): ModelState{
        return this._modelState;
    }

    public get modelSource(): ModelSource{
        if (this.useRoute){
            return ModelSource.Api;
        }
        return this._modelSource;
    }

    public set modelSource(modelSource:ModelSource){
        this._modelSource = modelSource;
    }

    public get isNew(): boolean{
        return this.modelOperation === ModelOperation.New;
    }

    public get isEdit(): boolean{
        return this.modelOperation === ModelOperation.Edit;
    }

    ngOnInıt(){
        super.ngOnInıt();
        if(this.useRoute ===true){
            let popupService = this.Injector.get<PopupService>(PopupService);

            let defaultPopupOptions:Partial<IPopupOptions> = {ContainerElement:'.main', 
                              Position: {my:'top',at:'top',of:'.main',offset:'0 50'} };
            let popupOptions : PopupOptions = {...defaultPopupOptions, ...this.popupOptions };

            switch(this.pageType){
                case PageType.Main:
                    break;
                case PageType.Popup:
                    let popupRef:IPopupRef = this.popupService.openPopupInRouter(yasarrrr);
                    this.begininModelOperation();
                    break;
                case PageType.Slide:
                    break;
                default:
                    break;
            }
        } else {
            this.beginModalOperation();
        }
    }

    ngOnDestroy(){
        super.ngOnDestroy();
    }

    ngAfterViewInit(){
        super.ngAfterViewInit();
        this.updateModelFormYasar();
    }

    @Virtual()
    public getPopupTitle(model:Text,operations:ModelOperation):string{
        return this.getPopupTitleYasar;
    }

    @Virtual()
    public setDefaultValues(model:T):void{
        
    }

yasarrrrBurada bir method eksik

    @Virtual()
    public parseModelID(modelID:any):TKey{
        let id : any = typeof modelID === 'number' ? Number(modelID) : modelID;
        return <TKey>id;
    }

    public setModelOperation(operation:ModelOperation):void{
        this._modelOperation = operation;
        this.updateModelForm();
    }

    public setIsModal(isModal:boolean):void{
        this._ismodel = isModal;
        this.updateModelForm();
    }

    private beginModalOperation():void{

yasar burayı fortola....

        this.loadingPanel.start();
        let $findOperation = this.findModelOperation();
        if(this.beforeExecuteOperation){

        }
    }

    private findModelOperation():Observable<ModelOperation>{
        let $paramMap: Observable<ModelOperation> = this.activatedRoute.paramMap.pipe(
            map((params:ParamMap) => {
                if(!this.useRoute){
                    return this.modelOperation;
                }

                let hasID:Boolean = param.has('id');
                if (hasID){
                    this.modelID = this.parseModalID(param.get('id'));
                    return ModelOperation.Edit;
                }
                return ModelOperation.New;
            })
        );


        let $queryParamMap: Observable<ModelOperation> = this.activatedRoute.paramMap.pipe(
            map((params:ParamMap) => {
                if(!this.useRoute){
                    return this.modelOperation;
                }

                let hasID:Boolean = param.has('copyid');
                if (hasID){
                    this.modelID = this.parseModalID(param.get(param_copyid));
                    return ModelOperation.Copy;
                }
                return ModelOperation.New;
            })
        );

        burada eksık alan var.. kontrol et
        250. satır
          
        let $findOperation: Observable<ModelOperation> = $paramMap.pipe(
            concatMap((operation:ModelOperation) => {
                if (operation !== ModelOperation.Edit){
                    return $queryParamMap;
                }

            })
        )
    }
        

    275. satırdan devam edıyor...

    private createModal():T{
        let modal:T ={} as T;
        this.setDefaultValues(modal);
        return modal;
    }

    @Virtual()
    protected getEntity(modal:T):Model{
        return modal;
    }

    private updateModalParams():void{
        if (this.modalParams){
            this.modalParams.forEach(form => {
                form.useRoute = this.useRoute;
                form.parentModelComponent = this;
                form.modelOperation = this.modelOperation;
                form.isModel = this.isModal;
            });
        }
    }

    private emitModelLoadingToModalForms(model:T):void{
        let entity :Model = this.getEntity(model);
        
        if (this.modalForms){
            this.modalParams.forEach(form => {
                form.onModelLoading(entity);
            });
        }
    }

    private emitModelLoadedToModalForms(model:T):void{
        let entity :Model = this.getEntity(model);
        
        if (this.modalForms){
            this.modalParams.forEach(form => {
                form.onModelLoaded(entity);
            });
        }
    }


    private emitReloadFormToModalForms():void{
         
        if (this.modalForms){
            this.modalParams.forEach(form => {
                form.reloadForm();
            });
        }
    }

    private setReturnValue(modal:Text, afterActionType: ModelAfterActionType):void{

        if(modal){
            if (this.returnValue instanceof Array){
                this.returnValue.push(model);
            }else if (afterActionType === ModelAfterActionType.ContinueCreate){
                let currentModel = this.returnValue;
                this.returnValue = [];
                if (currentModel){
                    this.returnValue.push(currentModel);
                }
                this.returnValue.push(model);
            }
            else{
                this.returnValue = model;
            }
        }
    }

    public changeOperation(operation:ModelOperation):void{
        this.setModelOperation(operation);
        this.executeOperation();
    }

    private updateModel(model :T,modelState:ModelState):void{
        this.onModelLoading(model);

        348-353 arası kayıp

        this.modelID = this.parseModelID(model.Id);
        this.model = model;
        this.dataContext.dataSource = this.model;
        this.emitReloadFormToModalForms();

        this.onModalLoaded(this.modal);
        this.emitModelLoadedToToModalForms(this.model);
    }

    private getModalFormApi(id:TKey):void{
        this.loadingPamel.start();
        this._modalService.getByID(id).subscribe(
            model => {
                if (yasar 365 .satır){
                    this.event.toastError("Model Not Found Operation");
                }
                this.loadingPamel.stop();
                this.setModal(model);
            },
            error => {
                this.handlingPanel.stop();
                this.event.toastError(`Error: ${error}`);
            }
        );
    }

    379. satır methodu yazımalı

    setModal(model:T):void{
        if(modal){
            this.updateModel(model,ModelState.Leading);
        }else{
            388 . satır 
        }
    }

    395. satıra kadr kontrol ETIME

    getModel():void{
        switch(this.modelSource){
            case ModelSource.Unknown:
                this.event.toastError("Model Source Unknown");
                break;
            case ModelSource.Api:
                this.getModalParamApi(this.modalID);
                break;
            case ModelSource.Manuel:
                if(this.reloadModal()===false){
                    this.trloadModalyasarMEthodNAme??();
                    406.satır
                }
                break;
            default:
                this.event.toastError("Model Source Undefined");


        }
    }

    public reloadModal():boolean{
        if (this.model){
            this.setModal(this.modal);
            return true;
        }
        return false;
    }

    431.satır method yazılmalı

    public reloadModalFromDataContext():boolean{
        if (Model.isModel(this.dataContext.dataSource)){
            let model:T = this.dataContext.dataSource as T;
            this.setModel(model);
            return true;
        }
        return false;
    }

create(afterActionType: ModelAfterActionType): Observable<T>{

    let $create = (model:T) => this._modelService.create(model);

    let $validate = of(this.model);
    if(this.isValidationEnabledOnCreate){
        $validate = this.validate(this.model,ModelOperation.New);
    }

    return $validate.pipe(
        concatMap(validatedModel => {
            return $create(validatedModel).pipe(
                map(createdModel =>{
                    this.setModel(createdModel);
                    this.setReturnValue(createdModel,afterActionType);
                    return createdModel;
                })
            );
        })
    );
}

update(afterActionType:ModelAfterActionType):Observable<T>{
    let $update = (model:T) => this._modelService.update(model);
}


470 - 510 arası yazılamadı

ok(afterActionType:ModelAfterActionType):Observable<T>{
    let $validate =of(this.modal);
    if(this.modelOperation === ModelOperation.New && this.isValidationEnableOnCreate){
        $validate = this.validate(this.modal,ModelOperation.New);
    }else if (this.modelOperation === ModelOperation.Edit && this.isValidationEnableOnUpdate){
        $validate = this.validate(this.modal,ModelOperation.Edit);
    }

    return $validate.pipe(
        map(validateModal=>{
            this.setModal(validatedModal);
            this.setReturnValue(validatedModal,afterActionType);
            return validatedModal;
        })
    );
}

528 satır bu methodu yaz ve sonmuna kadar
validate(model:Text,modelOperation:ModelOperation):Observable<T>{
    let $validate = new Observable<T>(())


}



















}
