import { Model, DataTypes } from '@sequelize/core';
import { Database } from '../../../config';
import { 
    EventStatus,
    IEventCreationAttributes,
    IEventAttributes 
} from './types';

const databaseInstance = Database.getInstance().getDatabase();


export class Event extends Model<IEventAttributes, IEventCreationAttributes> implements IEventAttributes {
    public id!: number;
    public name!: string; 
    public description!: string; 
    public volumn!:number;
    public totalTrades!:number;
    public totalShares!:number;
    public startDate!: Date;
    public resolutionDate!: Date; 
    public status!: EventStatus; 
    public liveYesCount!: number;
    public liveNoCount!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Event.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        volumn:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        totalTrades:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        totalShares:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        resolutionDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(EventStatus.OPEN, EventStatus.CLOSED, EventStatus.RESOLVED,EventStatus.FROZEN),
            defaultValue: EventStatus.CLOSED, 
        },
        liveYesCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0, 
        },
        liveNoCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        sequelize: databaseInstance,
        modelName: 'Event',
        tableName: 'events',
        timestamps: true, 
    }
);