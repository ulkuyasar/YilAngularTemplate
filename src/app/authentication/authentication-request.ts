export class AuthenticationRequest{

    UserName?:string;
    Password?:string;
    RefreshToken?:string;
    ClientId:string;
    CaptchaKey?:string;
    EncryptionKey?:string;
    PhoneNumber?:string;
    FastLogInPassword?:string;

    constructor(clientId:string){
        this.ClientId = clientId;
    }

    generateBodyForResourceOwnerCredentials():string{
        let body  = "grant_type=password&username="+this.UserName+"&password="+this.Password+"&client_id="+this.ClientId;
        if (this.CaptchaKey !=undefined && this.EncryptionKey !=undefined ){
            body  = body + ("&captcha_key="+this.CaptchaKey+"&encryption_key=" + this.EncryptionKey)
        }
        return body;
    }

    generateBodyForRefreshToken():string{
        let body  = "grant_type=refresh_token&refresh_token="+this.RefreshToken+"&client_id="+this.ClientId;
        return body;
    }

    generateBodyForCustomExtension():string{
        let body  = "grant_type=phonenumber&phonenumber="+this.PhoneNumber+"&fastloginpassword="+this.FastLogInPassword+"&client_id="+this.ClientId;
        return body;
    }
}