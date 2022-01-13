import { ThrowStmt } from "@angular/compiler";
import { Model } from "src/app/core/models/model";

export class MenuItem extends Model{

    public Code:string;
    public Name:string;
    public ParentID?:number;
    public Caption?:string;
    public Description?:string;
    public Icon?:string;
    public Action?: string | (()=>void);
    public items?:Array<MenuItem>;

    public TabKey:string;
    public MenuKey:string;
    public ParentMenuKey:string;
    public isAdmin:boolean;
    public isActive:boolean;
    public visible:boolean;
    public isHorizontalRulerVisible:boolean;
    public isHierarchical:boolean;

    constructor(){
        super();
        this.items = [];
        this.visible = true;
        this.isHorizontalRulerVisible = false;
        this.isHierarchical = true;
            
    }

    get text(){
        if(this.Caption && this.Caption!==''){
            return this.Caption;
        }
        return this.Name;
    }
    
}