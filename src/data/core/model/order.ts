import { Model, DataTypes } from '@sequelize/core';
import { Database } from '../../../config';
import { 
    Outcome, 
    OrderType,
    Status,
    Action,
    IOrderAttributes,
    IOrderCreationAttributes 
} from './types';

const databaseInstance = Database.getInstance().getDatabase();

export class Order extends Model<IOrderAttributes, IOrderCreationAttributes> implements IOrderAttributes {
    public id!: number;
    public eventId!: number; 
    public userId!: number;
    public outcome!: Outcome;
    public action!: Action;
    public orderType!: OrderType;
    public status!: Status;
    public quantity!: number;
    public price!: number;
    public left!:number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Order.init(
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
        eventId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        outcome: {
            type: DataTypes.ENUM(Outcome.YES, Outcome.NO),
            allowNull: false,
        },
        orderType: {
            type: DataTypes.ENUM(OrderType.AMM, OrderType.MARKET),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(Status.CANCELED, Status.PENDING,Status.COMPLETED),
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
        action: {
            type: DataTypes.ENUM(Action.BUY, Action.SELL),
            allowNull: false,
        }
    },
    {
        sequelize: databaseInstance,
        modelName: 'Order',
        tableName: 'orders',
        timestamps: true,
    }
);