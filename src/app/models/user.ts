export class User{
    name:string="";
    user_name:string="";
    email:string="";
    provider:string="";
    exp:number=-1;
    token:string="";
    isSignedIn:boolean=false;
    refreshToken:string="";
    language:string="";
    roles:string[]=[];
    picture:string="";
    first_name:string="";
    surname:string="";
    birthDate:Date=new Date;
    entranceDate:Date= new Date;
    registerId:string = "";
    division:string= "";
    screens:number[] = [];


}