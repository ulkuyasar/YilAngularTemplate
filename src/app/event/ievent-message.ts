import { EventType } from "./event-type.enum";

export interface IEventMessage{
    Type: EventType,
    Message?:string,
    Title?:string
}