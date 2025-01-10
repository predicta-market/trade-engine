import { Outcome,IOrderAttributes,Action } from '../../../model';
import BaseTradeExecutor from '../base-trade-executor';

class AmmTradeExecutor extends BaseTradeExecutor {
    private liquidityFactor: number; 
  
    constructor(liquidityFactor:number){
        super();
        this.liquidityFactor = liquidityFactor;
    }

    async executeTrade(order: IOrderAttributes): Promise<any>{

        const eventData = await this.getEventData(order.eventId);

        const {
            newPriceYES,
            newPriceNO,
            newLiquidityYES,
            newLiquidityNO,
        } = this.calculateNewAmmState(order, eventData.liquidityYES, eventData.liquidityNO);

        await this.updateEventData({
            eventId: order.eventId,
            liquidityYES: newLiquidityYES,
            liquidityNO: newLiquidityNO,
            priceYES: newPriceYES,
            priceNO: newPriceNO
        });
        
        return {
            eventId: order.eventId,
            outcome: order.outcome,
            price: order.outcome === Outcome.YES ? newPriceYES : newPriceNO,
            liquidityYES: newLiquidityYES,
            liquidityNO: newLiquidityNO,
            fulfilledAt: new Date()
        };
    }
    
    private calculateNewAmmState(
        order: IOrderAttributes,
        liquidityYES: number,
        liquidityNO: number
    ):{
        newPriceYES: number;
        newPriceNO: number;
        newLiquidityYES: number;
        newLiquidityNO: number;
    } {
        const tradeAmount = order.quantity;

        const newLiquidityYES =
            order.outcome === Outcome.YES
                ? liquidityYES + (order.action === Action.BUY ? tradeAmount : -tradeAmount)
                : liquidityYES;
        const newLiquidityNO =
            order.outcome === Outcome.NO
                ? liquidityNO + (order.action === Action.BUY ? tradeAmount : -tradeAmount)
                : liquidityNO;
        const adjustedLiquidityYES = newLiquidityYES * this.liquidityFactor;
        const adjustedLiquidityNO = newLiquidityNO * this.liquidityFactor;
        const newPriceYES = adjustedLiquidityYES / (adjustedLiquidityYES + adjustedLiquidityNO);
        const newPriceNO = 1 - newPriceYES;
        return {
            newPriceYES,
            newPriceNO,
            newLiquidityYES,
            newLiquidityNO,
        };
    }
}

export  {AmmTradeExecutor};