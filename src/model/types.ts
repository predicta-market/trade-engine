import { Optional } from 'sequelize';

export enum Outcome {
    YES = 'Yes',
    NO = 'No',
}

export enum TradeType {
    BUY = 'Buy',
    SELL = 'Sell',
}

// OpinionTrade
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