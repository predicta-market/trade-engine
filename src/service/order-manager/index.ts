import {MarketTradeExecutor,AmmTradeExecutor} from '../trade-executor';
import { IOrderAttributes, OrderType } from '../../model';
import { BadRequestError, GenericApiError, InternalServerError } from '../../common';

class OrderManager{
    public static async processOrder(order: IOrderAttributes): Promise<void> {
        try{
            let tradeExecutor:MarketTradeExecutor|AmmTradeExecutor;
            switch(order.orderType){
                case OrderType.MARKET:
                    tradeExecutor = new MarketTradeExecutor()
                    break;
                case OrderType.AMM:
                    tradeExecutor = new AmmTradeExecutor(10)
                    break;
                default:
                    throw new BadRequestError(`Unsupported order type: ${order.orderType}`);
            }
            await tradeExecutor.executeTrade(order);
        }catch(error){
            if(error instanceof GenericApiError){
                throw error;
            }
            throw new InternalServerError();
        }
    }
}

export default OrderManager;