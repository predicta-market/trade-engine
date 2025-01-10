import mongoose, { Schema, Document } from 'mongoose';
import { Outcome } from '../core/types';

interface IPriceRecord extends Document {
    eventId: string;
    outcome: Outcome;
    latestPrice: number;
    timestamp: Date;
}

const PriceRecordSchema = new Schema<IPriceRecord>({
    eventId: { 
        type: String, 
        required: true, 
        index: true 
    },
    outcome: { 
        type: String, 
        enum: ['yes', 'no'], 
        required: true 
    },
    latestPrice: { 
        type: Number, 
        required: true 
    },
    timestamp: { 
        type: Date, 
        default: Date.now, 
        index: true 
    }
    },
    { 
        collection: 'price_records' 
    }
);

// compound index for querying time-series data efficiently
PriceRecordSchema.index({ eventId: 1, outcome: 1, timestamp: -1 });

const PriceRecord = mongoose.model<IPriceRecord>('PriceRecord', PriceRecordSchema);

export default PriceRecord;