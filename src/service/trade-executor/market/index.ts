import { Queue, Worker } from 'bullmq';
import { Outcome,IOrderAttributes } from '../../../model';
import {BullMQConfig} from '../../../config';
import BaseTradeExecutor from '../base-trade-executor';

class MarketTradeExecutor extends BaseTradeExecutor{
    private bullMQConfig: BullMQConfig;
    private matchedQueue: Worker;
    private orderQueue: Queue; 

    constructor() {
        super();
        this.bullMQConfig = new BullMQConfig();
        this.orderQueue = this.bullMQConfig.createQueue('orderQueue');


        this.matchedQueue = this.bullMQConfig.createWorker(
            'matchedQueue',
            async (job) => this.handleMatchedOrders(job.data)
        );
    }

    private calculateLiquidityAndPrices(
        currentData: {
          liquidityYES: number;
          liquidityNO: number;
          priceYES: number;
          priceNO: number;
        },
        order1: IOrderAttributes,
        order2: IOrderAttributes
    ): {
        liquidityYES: number;
        liquidityNO: number;
        priceYES: number;
        priceNO: number;
    }  {
        
        const totalMatchedQuantity = order1.quantity + order2.quantity;
    
        let newLiquidityYES = currentData.liquidityYES;
        let newLiquidityNO = currentData.liquidityNO;
    
        if(order1.outcome === Outcome.YES){
          newLiquidityYES += totalMatchedQuantity;
          newLiquidityNO -= totalMatchedQuantity;
        } 
        else{
          newLiquidityYES -= totalMatchedQuantity;
          newLiquidityNO += totalMatchedQuantity;
        }
    
        const newPriceYES = newLiquidityYES / (newLiquidityYES + newLiquidityNO);
        const newPriceNO = newLiquidityNO / (newLiquidityYES + newLiquidityNO);
    
        return {
            liquidityYES: newLiquidityYES,
            liquidityNO: newLiquidityNO,
            priceYES: newPriceYES,
            priceNO: newPriceNO,
        };
    };

    private async handleMatchedOrders(matchedOrders: {
        order1: IOrderAttributes;
        order2: IOrderAttributes;
    }): Promise<void> {
        
        const { order1, order2 } = matchedOrders;
        
        const eventId = order1.eventId;
        const currentData = await this.getEventData(eventId);
    
        const updatedData = this.calculateLiquidityAndPrices(
          currentData,
          order1,
          order2
        );

        await this.updateEventData({
            eventId: order1.eventId,
            liquidityYES: updatedData.liquidityYES,
            liquidityNO: updatedData.liquidityNO,
            priceYES: updatedData.priceYES,
            priceNO: updatedData.priceNO
        });
    
        console.log(`Event ${eventId} updated with new liquidity and prices.`);
    }
    public async executeTrade(order: IOrderAttributes): Promise<void> {
        await this.orderQueue.add('matchOrder', order);
        console.log(`Order ${order.id} sent to matching service.`);
    }
}

export {MarketTradeExecutor};