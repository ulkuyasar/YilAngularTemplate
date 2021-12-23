import { AppConfig } from "./app.config";


export interface IConfigSubscriber {
    updateConfiguration(appConfig:AppConfig):void;
}