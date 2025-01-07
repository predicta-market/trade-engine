import { Model, DataTypes } from '@sequelize/core';
import { Database } from '../config';
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
    public startDate!: Date;
    public endDate!: Date;
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
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(EventStatus.OPEN, EventStatus.CLOSED, EventStatus.RESOLVED),
            allowNull: false,
            defaultValue: EventStatus.CLOSED, 
        },
        liveYesCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0, 
        },
        liveNoCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
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