import { Model, DataTypes } from '@sequelize/core';
import { Database } from '../config';
import { 
    Outcome, 
    TradeType,
    ITradeAttributes,
    ITradeCreationAttributes 
} from './types';

const databaseInstance = Database.getInstance().getDatabase();

export class OpinionTrade extends Model<ITradeAttributes, ITradeCreationAttributes> implements ITradeAttributes {
    public id!: number;
    public userId!: number; 
    public marketId!: number;
    public outcome!: Outcome;
    public quantity!: number;
    public price!: number;
    public tradeType!: TradeType;
    public readonly timestamp!: Date;
}

OpinionTrade.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        marketId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        outcome: {
            type: DataTypes.ENUM(Outcome.YES, Outcome.NO),
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        tradeType: {
            type: DataTypes.ENUM(TradeType.BUY, TradeType.SELL),
            allowNull: false,
        },
        timestamp: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize: databaseInstance,
        modelName: 'Trade',
        tableName: 'trades',
        timestamps: true,
    }
);