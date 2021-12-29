

export interface IStorageService{
    key(index:number):string|null;
    getItem(key:string):string|null;
    setItem(key:string,value:string):void;
    removeItem(key:string):void;
    clear():void;
}