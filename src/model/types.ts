import { Optional } from 'sequelize';

// Trade
export enum Outcome {
    YES = 'Yes',
    NO = 'No',
}

export enum TradeType {
    BUY = 'Buy',
    SELL = 'Sell',
}

export interface ITradeAttributes {
    id: number;
    userId: number;
    marketId: number; 
    outcome: Outcome; 
    quantity: number;
    price: number;
    tradeType: TradeType; 
    timestamp: Date; 
}

export interface ITradeCreationAttributes extends Optional<ITradeAttributes, 'id'> {}


// Event
export enum EventStatus {
    OPEN = 'Open',
    CLOSED = 'Closed',
    RESOLVED = 'Resolved',
}

export interface IEventAttributes {
    id: number;
    name: string; 
    description: string; 
    startDate: Date;
    endDate: Date; 
    status: EventStatus; 
    liveYesCount: number;
    liveNoCount: number;
}

export interface IEventCreationAttributes extends Optional<IEventAttributes, 'id'> {}