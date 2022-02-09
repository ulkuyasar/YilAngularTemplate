import { Injectable, Injector } from "@angular/core";
import { BaseService } from "../core/services/base-sevice";
import { IStorageService } from "./istorage-service";
import { LocalStorageService } from "./local-storage-service";

@Injectable({
providedIn:'root',
useClass:LocalStorageService
})
export class StorageService extends BaseService implements IStorageService{

    constructor(injector: Injector){
        super(injector);
    }

    key(index: number): string | null {
        return null;
    }
    getItem(key: string): string | null {
        return null;
    }
    setItem(key: string, value: string): void {

    }
    removeItem(key: string): void {

    }
    clear(): void {

    }



}
