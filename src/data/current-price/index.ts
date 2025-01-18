import {redis,RedisClient} from '../../config'; 

class PriceManager{
    private redis: RedisClient;

    constructor() {
        this.redis = redis;
    }
    
    public async createEventInRedis(
        eventId: string,
        liquidityYES: number,
        liquidityNO: number,
        priceYES: number,
        priceNO: number
    ):Promise<void>{

        const eventKey = `event:${eventId}`;
        
        const eventData = {
            liquidityYES: liquidityYES.toString(),
            liquidityNO: liquidityNO.toString(),
            priceYES: priceYES.toString(),
            priceNO: priceNO.toString(),
            datetime: new Date().toISOString(),
        };
        await this.redis.getClient().hmset(eventKey, eventData);
        console.log(`Event ${eventId} created with initial data:`, eventData);
    }
    
    public async getEventFromRedis(eventId: string): Promise<any>{
        const eventKey = `event:${eventId}`;
        const eventData = await this.redis.getClient().hgetall(eventKey);
        
        return {
            liquidityYES: parseFloat(eventData.liquidityYES || '10'),
            liquidityNO: parseFloat(eventData.liquidityNO || '10'),
            priceYES: parseFloat(eventData.priceYES || '50'),
            priceNO: parseFloat(eventData.priceNO || '50'),
        };
    }
    public async updateEventInRedis(fullfilledTrade:any): Promise<void> {
        const eventKey = `event:${fullfilledTrade.eventId}`;
        const info = {
            liquidityYES: fullfilledTrade.liquidityYES,
            liquidityNO: fullfilledTrade.liquidityNO,
            priceYES: fullfilledTrade.priceYES,
            priceNO: fullfilledTrade.priceNO
        }
        await this.redis.getClient().hmset(eventKey, info);
    }
}

export {PriceManager};