import {Outcome, PriceManager,recordPriceChange} from '../../data';

abstract class BaseTradeExecutor {
  protected priceManager: PriceManager;
  
  constructor() {
    this.priceManager = new PriceManager();
  }
  
  abstract executeTrade(trade: any): Promise<any>;

  protected async getEventData(eventId:number){
    return await this.priceManager.getEventFromRedis(eventId.toString());
  }
  
  protected async updateEventData(eventData:any){
      await this.priceManager.updateEventInRedis(eventData);
      await recordPriceChange(eventData.eventId,Outcome.YES,eventData.priceYES);
      await recordPriceChange(eventData.eventId,Outcome.NO,eventData.priceNO);
  }
}

export default BaseTradeExecutor;