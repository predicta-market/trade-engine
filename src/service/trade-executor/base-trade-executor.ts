import PriceManager from '../price-manager';

abstract class BaseTradeExecutor {
  protected priceManager: PriceManager;
  
  constructor() {
    this.priceManager = new PriceManager();
  }
  
  abstract executeTrade(trade: any): Promise<any>;

  protected async getEventData(eventId:number){
    return await this.priceManager.getEventFromRedis(eventId.toString());
  }
  protected async updateEventData(eventData:{}){
      await this.priceManager.updateEventInRedis(eventData);
  }

  protected async logAndUpdatePrice(fullfilledTrade: any): Promise<void>{
    await this.priceManager.updateEventInRedis(fullfilledTrade); 
  }
}

export default BaseTradeExecutor;