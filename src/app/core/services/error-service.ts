
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { EventService } from "src/app/event/event.service";
import { ErrorDialogComponent } from "src/app/layouts/error-dialog/error-dialog.component";
import { PopupOptions } from "src/app/layouts/popup/popup-options";
import { PopupRef } from "src/app/layouts/popup/popup-ref";
import { PopupService } from "src/app/layouts/popup/popup-service";
import { LocalizationService } from "src/app/localization/localization.service";
import { ErrorDetail } from "../data/error-detail";
import { ErrorMessage } from "../data/error-message";
import { ErrorSource } from "../data/error-source.enum";
import { isApiErrorDetail } from "../data/iapi-error-detail";
import { isOAuthErrorDetail } from "../data/ioauth-error-detail";
import { BaseService } from "./base-sevice";

@Injectable({providedIn:'root'})
export class ErrorService extends BaseService{
    
    public static errorNotifier:Subject<ErrorMessage> = new Subject<ErrorMessage>();

    private _eventService:EventService;
    private _localizationService:LocalizationService;

    constructor(injector:Injector, controller?:string,customUrl?:string){
        super(injector);
        this._eventService = this.Injector.get<EventService>(EventService);  
        this._localizationService = this.Injector.get<LocalizationService>(LocalizationService);     

    }
    
    initialize(){
        ErrorService.errorNotifier.subscribe(errorMessage =>{
            this.processError(errorMessage);
        })
    }

    handleHttpErrorResponce(httpErrorResponce: HttpErrorResponse){
        if (httpErrorResponce.error instanceof ErrorEvent){
            let errorMessage: ErrorMessage = {
                source:ErrorSource.Event,
                httpStatus:httpErrorResponce.status,
                url:httpErrorResponce.url,
                message:httpErrorResponce.message,
                error: new ErrorDetail(null,httpErrorResponce.error.message),
                errorBody:httpErrorResponce.error
            };
            ErrorService.errorNotifier.next(errorMessage);
        }
        else if (isApiErrorDetail(httpErrorResponce.error)){
            let localizedErrorMessage = this._localizationService.getMessage(httpErrorResponce.error.Code,httpErrorResponce.error.Parameters);

            let errorMessage: ErrorMessage = {
                source:ErrorSource.Api,
                httpStatus:httpErrorResponce.status,
                url:httpErrorResponce.url,
                message:localizedErrorMessage,
                error: new ErrorDetail(httpErrorResponce.error.Code,localizedErrorMessage,null,httpErrorResponce.error.Message),
                errorBody:httpErrorResponce.error
            };
            ErrorService.errorNotifier.next(errorMessage);
        }else if (isOAuthErrorDetail(httpErrorResponce.error)){
            
            let errorMessage: ErrorMessage = {
                source:ErrorSource.OAuth,
                httpStatus:httpErrorResponce.status,
                url:httpErrorResponce.url,
                message:httpErrorResponce.message,
                error: new ErrorDetail(httpErrorResponce.error.error,httpErrorResponce.error.error_description),
                errorBody:httpErrorResponce.error
            };
            ErrorService.errorNotifier.next(errorMessage);
        }else{
            let errorMessage: ErrorMessage = {
                source:ErrorSource.Unknown,
                httpStatus:httpErrorResponce.status,
                url:httpErrorResponce.url,
                message:httpErrorResponce.message,
                errorBody:httpErrorResponce.error
            };
            ErrorService.errorNotifier.next(errorMessage);
        }
        return throwError('Something bad happeded;please try again later.'); 
    }

    private processError(errorMessage:ErrorMessage){
        if(errorMessage.httpStatus===400){
            this.process400BadRequest(errorMessage);
        } else if(errorMessage.httpStatus===401){
            this.process401Unathorized(errorMessage);
        } else if(errorMessage.httpStatus===403){
            this.process403Forbidden(errorMessage);
        } else if(errorMessage.httpStatus===404){
            this.process404NotFound(errorMessage);
        } else if(errorMessage.httpStatus===500){
            this.process500InternalServerError(errorMessage);
        }else {
            this.processUnknownError(errorMessage);
        }
    }

    private process401Unathorized(errorMessage:ErrorMessage){
        let loginService = this.Injector.get<LoginService>(LoginService);
        let localizationService = this.Injector.get<LocalizationService>(LocalizationService);

        let unauthorizedMessage:string = localizationService.getMessage('unauthorized');
        errorMessage.message = unauthorizedMessage;
        if(errorMessage.error){
            errorMessage.error.message = unauthorizedMessage;
        }

        let afterErrorDialogCreate = (componentInstance: ErrorDialogComponent)=>{
            componentInstance.errorMessage = errorMessage;
            componentInstance.buttonText = 'error.dialog.button.gotologin';
        }

        let popupOptions : PopupOptions = new PopupOptions({
            ShowTitle:false
        })

        let popupService : PopupService = this.Injector.get<PopupService>(PopupService);
        let popupRef: PopupRef<ErrorDialogComponent> = popupService.openGlobalPopupWithComponentType(ErrorDialogComponent,popupOptions,afterErrorDialogCreate)
        popupRef.afterClosed().subscribe((data:any) => {
            loginService.navigateToLogin(false);
        });
    }

    private process400BadRequest(errorMessage:ErrorMessage){
        switch(errorMessage.source){
            case ErrorSource.Api:
                this.toastError(errorMessage);
                break;
            case ErrorSource.Unknown:
                this.showErrorInPopup(errorMessage);
                break;
            case ErrorSource.Event:
                this.toastError(errorMessage);
                break;
            case ErrorSource.OAuth:
                this.showErrorInPopup(errorMessage);
                break;
            default:
                this.toastError(errorMessage);
                break;
        }
    }


    private process403Forbidden(errorMessage:ErrorMessage){
        switch(errorMessage.source){
            case ErrorSource.Api:
            case ErrorSource.Unknown:
                this.showErrorInPopup(errorMessage);
                break;
            case ErrorSource.Event:
            case ErrorSource.OAuth:
            case ErrorSource.OData:
                this.toastError(errorMessage);
                break;
            default:
                this.toastError(errorMessage);
                break;
        }

    }

    private process404NotFound(errorMessage:ErrorMessage){
        switch(errorMessage.source){
            case ErrorSource.Api:
            case ErrorSource.Unknown:
                this.showErrorInPopup(errorMessage);
                break;
            case ErrorSource.Event:
            case ErrorSource.OAuth:
            case ErrorSource.OData:
                this.toastError(errorMessage);
                break;
            default:
                this.toastError(errorMessage);
                break;
        }

    }

    private process500InternalServerError(errorMessage:ErrorMessage){
        switch(errorMessage.source){
            case ErrorSource.Api:
            case ErrorSource.Unknown:
            case ErrorSource.Event:
            case ErrorSource.OAuth:
            case ErrorSource.OData:
                this.toastError(errorMessage);
                break;
            default:
                this.toastError(errorMessage);
                break;
        }

    }

    private processUnknownError(errorMessage:ErrorMessage){
        switch(errorMessage.source){
            case ErrorSource.Api:
            case ErrorSource.Unknown:
            case ErrorSource.Event:
            case ErrorSource.OAuth:
            case ErrorSource.OData:
                this.toastError(errorMessage);
                break;
            default:
                this.toastError(errorMessage);
                break;
        }

    }

    private toastError(errorMessage:ErrorMessage):void{
        if (errorMessage.httpStatus){
            this._eventService.toastError(`${errorMessage.httpStatus} - ${this._localizationService.getMessage(errorMessage.message)}`);

        }else{
            this._eventService.toastError(`${this._localizationService.getMessage(errorMessage.message)}`);
        }
    }

    private showErrorInPopup(errorMessage:ErrorMessage):void{
        let afterErrorDialogCreate = (componentInstance:ErrorDialogComponent) =>{
            componentInstance.errorMessage = errorMessage;
            componentInstance.buttonText = this._localizationService.getMessage('global.ok');
        }

        let popupOptions : PopupOptions = new PopupOptions({
            ShowTitle:false,
            Width:400,
            Height:"auto",
            ShowCloseButton:false,
            DragEnabled:false,
            Position:{
                my:'center',at:'center',of:window
            }
        });

        let popupService : PopupService = this.Injector.get<PopupService>(PopupService);
        popupService.openGlobalPopupWithComponentType(ErrorDialogComponent,popupOptions,afterErrorDialogCreate);
    }

    public static handleError(error:any){
        let errMsg = "";
        if(error instanceof HttpErrorResponse){
            errMsg = error.error.Message;
        }else if(error._body){
            try{
                let obj = JSON.parse(error._body);
                if (obj && typeof obj === "object"){
                    if(obj.Message){
                        errMsg = obj.Message + '. ';
                    }else if (obj.ExceptionMessage){
                        errMsg += obj.ExceptionMessage + '. ';
                    }
                

                if(obj.error){
                    if(obj.error.message){
                        errMsg += obj.error.message + '. ';
                    }

                    if(obj.error.innererror){
                        errMsg += obj.error.innererror.message + '. ';
                    }
                }
            }
        }catch(e){}
        }

        if (errMsg ==""){
            if(error.status){
                errMsg +=`${error.status} - ${error.statusText}`;
            }

            if(error.message){
                errMsg +=error.message + ' ';
            }
        }

        if (errMsg ==""){
            errMsg += 'Server error';
        }

        return Observable.throw(errMsg);
    }
}