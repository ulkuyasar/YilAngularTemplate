import { Injector } from "@angular/core";
import { BaseService } from "../core/services/base-sevice";
import { IStorageService } from "./istorage-service";

export class LocalStorageService extends BaseService implements IStorageService{
    
    constructor(injector: Injector){
        super(injector);
    }
    
    key(index: number): string | null {
        return localStorage.key(index);
    }
    getItem(key: string): string | null {
        return localStorage.getItem(key);
    }
    setItem(key: string, value: string): void {
        localStorage.setItem(key,value);
    }
    removeItem(key: string): void {
        localStorage.removeItem(key);
    }
    clear(): void {
        localStorage.clear();
    }

}