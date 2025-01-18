import { PriceRecord, IPriceRecord } from './model';
import { Outcome } from '../core/model/types';

class PriceRecordRepository {
    async create(eventId: number, outcome: Outcome, latestPrice: number): Promise<void> {
        try{
            const newPriceRecord = new PriceRecord({
                eventId,
                outcome,
                latestPrice,
                timestamp: new Date(),
            });
            await newPriceRecord.save();
        }catch(error){
            console.error('Error recording price change:', error);
        }
    }

    async getPriceHistory(eventId: number, outcome: Outcome): Promise<IPriceRecord[] | void> {
        try {
            const priceHistory = await PriceRecord.find({
                eventId: eventId,
                outcome: outcome,
            });
            return priceHistory;
        }catch(error){
            console.error('Error retrieving price history:', error);
        }
    }
}

export default PriceRecordRepository;