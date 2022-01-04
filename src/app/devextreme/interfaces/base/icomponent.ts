export interface IComponent {
    options?:<TValue=any>(optionName:string,value?:TValue)=>TValue
}