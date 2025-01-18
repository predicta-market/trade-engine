import { Optional } from 'sequelize';

// Order
export enum Outcome{
    YES = 'Yes',
    NO = 'No'
}

export enum OrderType{
    AMM = 'AMM',
    MARKET = 'MARKET'
}

export enum Action{
    BUY = 'Buy',
    SELL = 'Sell'
}

export enum Status{
    PENDING = 'Pending',
    COMPLETED = 'Completed',
    CANCELED = 'Canceled',
}

export interface IOrderAttributes{
    id:number;
    eventId: number;
    userId: number; 
    outcome: Outcome; 
    action: Action;
    orderType: OrderType;  
    status: Status;
    price: number; 
    quantity: number; 
    left:number
}

export interface IOrderCreationAttributes extends Optional<IOrderAttributes, 'id'> {}


// Event
export enum EventStatus {
    OPEN = 'Open',
    CLOSED = 'Closed',
    RESOLVED = 'Resolved',
    FROZEN = 'Frozen',
}

export interface IEventAttributes {
    id: number;
    name: string; 
    description: string; 
    volumn:number;
    totalTrades:number;
    totalShares:number;
    startDate: Date;
    resolutionDate: Date; 
    status: EventStatus; 
    liveYesCount: number;
    liveNoCount: number;
}

export interface IEventCreationAttributes extends Optional<IEventAttributes, 'id' | 'liveNoCount'| 'liveYesCount'| 'status'| 'totalTrades'|'totalShares'|'volumn'> {}