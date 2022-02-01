import { EventEmitter, Injectable, Injector } from "@angular/core"
import { ApiService } from "../core/services/api-service"
import { User } from "../models/user"
import { ConfigService } from "../config/config.service";
import { Observable } from "rxjs";
import { Base64 } from "js-base64";
import { AuthenticationConstants } from "./authentication.constants";
import { AuthenticationResponce } from "./authentication-responce";
import { AuthenticationRequest } from "./authentication-request";
import { ActivatedRouteSnapshot } from "@angular/router";
import { StorageService } from "../storage/storage-service";
import { AuthenticationContextType } from "./authentication-context-type.enum";

@Injectable({providedIn:'root'})
export class AuthenticationService extends ApiService{

    private _currentUser?:User;
    currentUserChangedEvent:EventEmitter<User>;
    private _currentAuthenticationContextType: AuthenticationContextType = AuthenticationContextType.Default;
    currentAuthenticationContextTypeChangeEvent : EventEmitter<AuthenticationContextType>;

    private _clientId?:string;
    private _storageService:StorageService;

    constructor(injector:Injector){
        super(injector);
        this._storageService = injector.get<StorageService>(StorageService);
        let configService = injector.get<ConfigService>(ConfigService);

        if (configService.appConfig && configService.appConfig.ClientId){
            this._clientId = configService.appConfig.ClientId;
        }
        configService.requestAppConfig().subscribe(appConfig => {
            this._clientId = appConfig.ClientId;
        });

        this.currentUserChangedEvent = new EventEmitter<User>();
        this.currentAuthenticationContextTypeChangeEvent = new EventEmitter<AuthenticationContextType>();
    }


    public login(userName: string,password:string,capthaKey?:string,encriptionKey?:string)
    :Observable<AuthenticationResponce>{
        let authenticationRequest : AuthenticationRequest = new AuthenticationRequest(this._clientId as string);
        authenticationRequest.UserName = userName;
        authenticationRequest.Password = password;
        authenticationRequest.CaptchaKey = capthaKey;
        authenticationRequest.EncryptionKey = encriptionKey;
        return this._login(authenticationRequest.generateBodyForResourceOwnerCredentials());

    }

    loginWithRefreshToken(refreshToken:string):Observable<AuthenticationResponce>{
        let authenticationRequest : AuthenticationRequest = new AuthenticationRequest(this._clientId as string);
        authenticationRequest.RefreshToken = refreshToken;
        return this._login(authenticationRequest.generateBodyForRefreshToken());

    }

    private _login(tokenBody:string):Observable<AuthenticationResponce>{
        let $token : Observable<AuthenticationResponce> = this.postRequest<AuthenticationResponce>(this.baseUrl+'/token',tokenBody);

        //Beceremedin. Burayı kesın  acmalisin
        //25.12 fotoları
        // return $token.pipe(
        //     map(responce=>{
        //         this._processLogInResponce(responce );
        //         return responce ;

        //     })
        // ) ;
        return $token;
    }


    // public getConfig():Observable<AppConfig>{
    //     return this.http.get<AppConfig>(configFileUrl).pipe(
    //         map(appConfig => {
    //             this.updateConfig(appConfig);
    //             return appConfig;
    //         })
    //     );
    // }

    private _processLogInResponce(responce :AuthenticationResponce):void{
        let user:User = <User>JSON.parse(responce.user as string);
        this._storageService.setItem(AuthenticationConstants.USER,JSON.stringify(user));
        this._storageService.setItem(AuthenticationConstants.ACCESSTOKEN,responce.access_token as string);
        this._storageService.setItem(AuthenticationConstants.TOKENTYPE,responce.tokenType as string);
        this.setUser(user);
        this.setAuthenticationContextType(AuthenticationContextType.Default);

    }

    private _processLogoutResponce():void{
        this._storageService.removeItem(AuthenticationConstants.USER);
        this._storageService.removeItem(AuthenticationConstants.ACCESSTOKEN);
        this._storageService.removeItem(AuthenticationConstants.TOKENTYPE);
        this._storageService.removeItem(AuthenticationConstants.ISADMIN);
        this._storageService.removeItem(AuthenticationConstants.ROLETYPE);
        this._storageService.clear();
    }

    logout(withLogOutRequest:boolean){
        if(withLogOutRequest){
            let $logout:Observable<void> = this.postRequest(this.apiUrl+'/logout',"");

            $logout.subscribe(()=>{
                this._processLogoutResponce();
            })
        }else{
            this._processLogoutResponce();
        }
    }

    // renewToken():Observable<void>{
    //     let $a: Observable<void> = Observable<void>((subscriber:Subscriber<void>) =>{
    //        let user = <User>JSON.parse(this._storageService.getItem(AuthenticationConstants.USER));
    //         this.setUser(user);
    //         subscriber.next();
    //     });
    //     return $a;
    // }

    get currentUser():User{
        let user = <User>JSON.parse(this._storageService.getItem(AuthenticationConstants.USER) as string);
        return user;
    }

    get currentAuthenticationContextType():AuthenticationContextType{
        return this._currentAuthenticationContextType;
    }

    get accessToken():string {
        return this._storageService.getItem(AuthenticationConstants.ACCESSTOKEN) as string;
    }

    get isAdmin():boolean{
        let isAdminString:string = this._storageService.getItem(AuthenticationConstants.ISADMIN) as string;
        if (isAdminString && isAdminString.toLowerCase()==="true"){
            return true;
        }
        else{
            return false;
        }
    }

    get isAuthenticated():boolean{
        return this._storageService.getItem(AuthenticationConstants.ACCESSTOKEN) != null;
    }


    public hasRole(roleName:string):boolean{
        let user = this._currentUser;
        return user!=undefined && user.roles && (user.roles.indexOf(roleName)>-1);
    }

    public hasScreen(screenId:number):boolean{
        let user = this._currentUser;
        return user!=undefined && user.screens && (user.screens.indexOf(screenId)>-1);
    }

    public getAuthenticationContextTypeFromActivatedRouteChain(activatedRouteSnapshot:ActivatedRouteSnapshot):AuthenticationContextType{
        let authenticationContextType : AuthenticationContextType = AuthenticationContextType.Default;
        return authenticationContextType;
    }

    public changeAuthenticationContextType(contextType: AuthenticationContextType):void{
        this.setAuthenticationContextType(contextType);
    }

    private setUser(user:User):void{
        this._currentUser = user;
        this.onCurrentUserChanged(user);
    }

    private setAuthenticationContextType(contextType: AuthenticationContextType):void{
        this._currentAuthenticationContextType = contextType;
        this.onCurrentAuthenticationContextTypeChanged(contextType);
    }

    onCurrentUserChanged(user:User){
        let handled:boolean = false;
        if (this.currentUserChangedEvent.observers.length>0){
            handled = true;
            this.currentUserChangedEvent.emit(user);
        }
        return handled;
    }

    onCurrentAuthenticationContextTypeChanged(authenticationContextType: AuthenticationContextType){
        let handled:boolean = false;
        if (this.currentAuthenticationContextTypeChangeEvent.observers.length>0){
            handled = true;
            this.currentAuthenticationContextTypeChangeEvent.emit(authenticationContextType);
        }
        return handled;
    }

    processLogInwithToken(token:string):void{
        let user:User = <User>JSON.parse(Base64.decode(token.split('.')[1]));
        this._storageService.setItem(AuthenticationConstants.USER,JSON.stringify(user));
        this._storageService.setItem(AuthenticationConstants.ACCESSTOKEN,token);
        this.setUser(user);
        this.setAuthenticationContextType(AuthenticationContextType.Default);

    }

    //beamerdangelenılk logın.. kendıne gore hazırlarsın
    firstLogin():void{
        // var tokenUrl : string;
        // let beamerAppSettingDefinitionService = this.Injector.get<BeamerAppSettingDefinitionService>(BeamerAppSettingDefinitionService);
        // beamerAppSettingDefinitionService.getRefreshTokenUrl().pipe(map((refreshToken)))
    }

}
