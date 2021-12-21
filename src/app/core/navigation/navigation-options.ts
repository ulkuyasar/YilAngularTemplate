import { ActivatedRoute, Params } from "@angular/router";

export class NavigationOptions{
    Path:string = "";
    Args?:any[];
    QueryParams?:Params;
    RelativeTo?:ActivatedRoute

}