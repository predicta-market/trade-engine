import PriceRecord from './model'; 
import { Outcome } from '../core/types';


async function recordPriceChange(eventId: string, outcome: Outcome, latestPrice: number) {
    try{
        const newPriceRecord = new PriceRecord({
            eventId,
            outcome,
            latestPrice,
            timestamp: new Date()
        });
        await newPriceRecord.save();
    }catch(error){
        console.error('Error recording price change:', error);
    }
}

export default recordPriceChange;