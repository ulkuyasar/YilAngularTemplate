
//gerisi telefnunda 13 aralik

const __typeof__ = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (obj:any){
    return typeof obj
} : function (obj :any){
    return obj && "function" === typeof Symbol &&  obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj 
};


export function getType(object:any):any{
    const typeOfObject = Object.prototype.toString.call(object);
    return "object" === ("undefined" === typeof object ? "undefined" : __typeof__(object))
}

export function isDate(object:any):boolean{
    return "date" === getType(object)
}

export function isBoolean(object:any):boolean{
    return "boolean" === getType(object)
}