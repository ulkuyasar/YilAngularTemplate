import { AfterViewInit,  EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChildren, ViewContainerRef } from "@angular/core";
import { ParamMap } from "@angular/router";
import { ok } from "assert";
import { Observable, of, Subscriber } from "rxjs";
import { concatMap, map } from "rxjs/operators";
import { ModelFormComponent } from "src/app/layouts/model-form/model-form.component";
import { IPopupOptions } from "src/app/layouts/popup/ipopup-options";
import { IPopupRef } from "src/app/layouts/popup/ipopup-ref";
import { PopupOptions } from "src/app/layouts/popup/popup-options";
import { PopupService } from "src/app/layouts/popup/popup-service";
import { IReturnValue } from "../component-model/ireturn-value";
import { PageType } from "../component-model/page-type.enum";
import { ErrorMessage } from "../data/error-message";
import { Virtual } from "../decorators/virtual";
import { Model } from "../models/model";
import { ModelAfterActionType } from "../models/model-after-action-type.enum";
import { ModelOperation } from "../models/model-operation.enum";
import { ModelSource } from "../models/model-source.enum";
import { ModelState } from "../models/model-state.enum";
import { IModelService } from "../services/imodel-service";
import { IModelComponent } from "./imodel-component";
import { PageComponent } from "./page-component";


export abstract class ModelComponent<T extends Model,TKey =number | string>
                                       extends PageComponent implements OnInit, OnDestroy, AfterViewInit, IModelComponent,
                                       IReturnValue<T | Array<T>>{

    @ViewChildren(ModelFormComponent)
    modelForms:QueryList<ModelFormComponent>;

    @Input()
    model: T;

    @Input('isValidationEnabledOnCreate')
    isValidationEnabledOnCreate:boolean;

    @Input('isValidationEnabledOnUpdate')
    isValidationEnabledOnUpdate:boolean;

    @Input('isValidationEnabledOnDelete')
    isValidationEnabledOnDelete:boolean;


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


    constructor(modelService:IModelService<T,TKey>,viewContainerRef: ViewContainerRef){
        super(viewContainerRef);

        this.modelLoadingEvent = new EventEmitter<T>();
        this.modelLoadedEvent = new EventEmitter<T>();

        this.isValidationEnabledOnCreate = true;
        this.isValidationEnabledOnUpdate = true;
        this.isValidationEnabledOnDelete = false;

        this.modelLoadedEvent.subscribe((model:T) =>{
            this.popupOptions.Title = this.getPopupTitle(model,this.modelOperation);
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
         this._modelID = id;
    }

    public get modelOperation():ModelOperation{
        return this._modelOperation;
    }

    public get isModal():boolean{
        return this._isModal;
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

    ngOnInit(){
        super.ngOnInit();
        if(this.useRoute ===true){
            let popupService = this.Injector.get<PopupService>(PopupService);

            let defaultPopupOptions:Partial<IPopupOptions> = {ContainerElement:'.main',
                              Position: {my:'top',at:'top',of:'.main',offset:'0 50'} };
            let popupOptions : PopupOptions = {...defaultPopupOptions, ...this.popupOptions };

            switch(this.pageType){
                case PageType.Main:
                    break;
                case PageType.Popup:
                   // let popupRef:IPopupRef = this.popupService.openPopupInRouter(this.componentHierarchyService.getRouteInfo(this.hierarchyInfo),popupOptions);
                    this.beginModelOperation();
                    break;
                case PageType.Side:
                    break;
                default:
                    break;
            }
        } else {
            this.beginModelOperation();
        }
    }

    ngOnDestroy(){
        super.ngOnDestroy();
    }

    ngAfterViewInit(){
        super.ngAfterViewInit();
        this.updateModelForms();
    }

    @Virtual()
    public getPopupTitle(model:T,operations:ModelOperation):string{
        return this.popupOptions.Title;
    }

    @Virtual()
    public setDefaultValues(model:T):void{

    }

    @Virtual()
    public validateModel(model:T,operation: ModelOperation):T{
        return model;
    }

    @Virtual()
    public parseModelID(modelID:any):TKey{
        let id : any = typeof modelID === 'number' ? Number(modelID) : modelID;
        return <TKey>id;
    }

    public setModelOperation(operation:ModelOperation):void{
        this._modelOperation = operation;
        this.updateModelForms();
    }

    public setIsModal(isModal:boolean):void{
        this._isModal = isModal;
        this.updateModelForms();
    }

    private beginModelOperation():void{
        this.loadingPanel.start();
        let $findOperation = this.findModelOperation();
        if(this.beforeExecuteOperation){
            $findOperation = $findOperation.pipe(concatMap((operation:ModelOperation)=>{
                return this.beforeExecuteOperation(operation);
            }));
        }
        $findOperation.subscribe((operation:ModelOperation)=>{
            this.setModelOperation(operation);
            setTimeout(()=>{
                this.loadingPanel.stop();
                this.executeOperation();
            },5);
        },(error:any)=>{
            this.loadingPanel.stop();
        });
    }

    private findModelOperation():Observable<ModelOperation>{
        let $paramMap: Observable<ModelOperation> = this.activatedRoute.paramMap.pipe(
            map((params:ParamMap) => {
                if(!this.useRoute){
                    return this.modelOperation;
                }

                let hasID:Boolean = params.has('id');
                if (hasID){
                    this.modelID = this.parseModelID(params.get('id'));
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

                let param_copyid:string = params.keys.find(param => param.toLowerCase() === 'copyid');
                if (param_copyid){
                    this.modelID = this.parseModelID(params.get(param_copyid));
                    return ModelOperation.Copy;
                }
                return ModelOperation.New;
            })
        );


        let $findOperation: Observable<ModelOperation> = $paramMap.pipe(
            concatMap((operation:ModelOperation) => {
                if (operation !== ModelOperation.Edit){
                    return $queryParamMap;
                }
                return of(operation);

            })
        );
        return $findOperation;
    }

    private executeOperation():void{
        let operation:ModelOperation = this.modelOperation;
        switch(operation){
            case ModelOperation.New:
                this.newModel();
                break;
            case ModelOperation.Edit:
            case ModelOperation.Copy:
            case ModelOperation.View:
                this.getModel();
                break;
            default:
                this.event.toastError(`Invalid Model Operation ${operation}`);
                break;
        }
    }


    private createModal():T{
        let modal:T ={} as T;
        this.setDefaultValues(modal);
        return modal;
    }

    @Virtual()
    protected getEntity(modal:T):Model{
        return modal;
    }

    private updateModelForms():void{
        if (this.modelForms){
            this.modelForms.forEach(form => {
                form.useRoute = this.useRoute;
                form.parentModelComponent = this;
                form.modelOperation = this.modelOperation;
                form.isModal = this.isModal;
            });
        }
    }

    private emitModelLoadingToModelForms(model:T):void{
        let entity :Model = this.getEntity(model);

        if (this.modelForms){
            this.modelForms.forEach(form => {
                form.onModelLoading(entity);
            });
        }
    }

    private emitModelLoadedToModelForms(model:T):void{
        let entity :Model = this.getEntity(model);

        if (this.modelForms){
            this.modelForms.forEach(form => {
                form.onModelLoaded(entity);
            });
        }
    }


    private emitReloadFormToModelForms():void{

        if (this.modelForms){
            this.modelForms.forEach(form => {
                form.reloadForm();
            });
        }
    }

    private setReturnValue(model:T, afterActionType: ModelAfterActionType):void{

        if(model){
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
        this.emitModelLoadingToModelForms(model);
        this._modelState = modelState;
        this.modelID = this.parseModelID(model.Id);
        this.model = model;
        this.dataContext.dataSource = this.model;
        this.emitReloadFormToModelForms();

        this.onModelLoaded(this.model);
        this.emitModelLoadedToModelForms(this.model);
    }

    private getModelFormApi(id:TKey):void{
        this.loadingPanel.start();
        this._modelService.getByID(id).subscribe(
            model => {
                if (!model){
                    this.event.toastError("Model Not Found Operation");
                }
                this.loadingPanel.stop();
                this.setModel(model);
            },
            error => {
                this.loadingPanel.stop();
                this.event.toastError(`Error: ${error}`);
            }
        );
    }

    newModel():void{
        this.updateModel(this.createModal(),ModelState.Loading);
    }

    setModel(model:T):void{
        if(model){
            this.updateModel(model,ModelState.Loading);
        }else{
            this.newModel();
        }
    }

    clearModel():void{
        this.updateModel(this.createModal(),ModelState.Clearing);
    }

    getModel():void{
        switch(this.modelSource){
            case ModelSource.Unknown:
                this.event.toastError("Model Source Unknown");
                break;
            case ModelSource.Api:
                this.getModelFormApi(this.modelID);
                break;
            case ModelSource.Manual:
                if(this.reloadModel()===false){
                    this.reloadModalFromDataContext();
                }
                break;
            default:
                this.event.toastError("Model Source Undefined");
                break;
        }
    }

    public reloadModel():boolean{
        if (this.model){
            this.setModel(this.model);
            return true;
        }
        return false;
    }

    public reloadModelFromApi():boolean{
        if (this.modelID){
            this.getModelFormApi(this.modelID);
            return true;
        }
        return false;
    }

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
        let $validate = of(this.model);
        if(this.isValidationEnabledOnUpdate){
            $validate = this.validate(this.model,ModelOperation.Edit);
        }

        return $validate.pipe(
            concatMap(validatedModel => {
                return $update(validatedModel).pipe(
                    map(updatedModel =>{
                        this.setModel(updatedModel);
                        this.setReturnValue(updatedModel,afterActionType);
                        return updatedModel;
                    })
                );
            })
        );
    }

    delete(afterActionType:ModelAfterActionType):Observable<T>{
        let $delete = (model:T) => this._modelService.delete(model);
        let $validate = of(this.model);
        if(this.isValidationEnabledOnDelete){
            $validate = this.validate(this.model,ModelOperation.Delete);
        }

        return $validate.pipe(
            concatMap(validatedModel => {
                return $delete(validatedModel).pipe(
                    map(deletedModel =>{
                        this.setModel(deletedModel);
                        this.setReturnValue(deletedModel,afterActionType);
                        return deletedModel;
                    })
                );
            })
        );
    }




ok(afterActionType:ModelAfterActionType):Observable<T>{
    let $validate =of(this.model);
    if(this.modelOperation === ModelOperation.New && this.isValidationEnabledOnCreate){
        $validate = this.validate(this.model,ModelOperation.New);
    }else if (this.modelOperation === ModelOperation.Edit && this.isValidationEnabledOnUpdate){
        $validate = this.validate(this.model,ModelOperation.Edit);
    }

    return $validate.pipe(
        map(validatedModal=>{
            this.setModel(validatedModal);
            this.setReturnValue(validatedModal,afterActionType);
            return validatedModal;
        })
    );
}


validate(model:T,modelOperation:ModelOperation):Observable<T>{
    let $validate = new Observable<T>((subscriber:Subscriber<T>)=>{
        let validatedModel:T =this.validateModel(model,modelOperation);
        let hasRequirement :boolean = false;
        this.modelForms.forEach(modelForm => {
            if(modelForm.checkRequiredItems(validatedModel)===false){
                hasRequirement = true;
                let errorMessage: ErrorMessage = new ErrorMessage();
                errorMessage.message = this.localization.getMessage('model.requirements.unsatisfied');
                subscriber.error(errorMessage);
            }
        });
        if (hasRequirement===false){
            subscriber.next(validatedModel);
        }
        subscriber.complete();
    })
    return $validate;

}

onModelLoading(model:T):boolean{
    let handled : boolean = false;
    if (this.modelLoadingEvent.observers.length >0){
        handled = true;
        this.modelLoadingEvent.emit(model);
    }
    return handled;
}

onModelLoaded(model:T):boolean{
    let handled : boolean = false;
    if (this.modelLoadedEvent.observers.length >0){
        handled = true;
        if(this.beforeModelLoaded){
            this.beforeModelLoaded(model).subscribe((modelReturned) => {
                this.modelLoadedEvent.emit(modelReturned);
            });

        }else{
            this.modelLoadedEvent.emit(model);
        }
    }
    this._modelState = ModelState.Loaded;
    return handled;
}




}
