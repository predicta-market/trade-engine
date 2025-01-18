import { ValidationError } from '@sequelize/core';
import {BadRequestError,ConflictError,InternalServerError, GenericApiError,NotFoundError} from '../../../common';
import { IOrderAttributes,IOrderCreationAttributes } from '../model';
import {OrderRepository} from '../repository';
import OrderManager from '../../../service/order-manager';


class OrderService{
    private orderRepository:OrderRepository

    constructor(){
        this.orderRepository = new OrderRepository();
    }

    async createOrder(orderDetails:IOrderCreationAttributes):Promise<IOrderAttributes>{
        try{
            const order:IOrderAttributes = await this.orderRepository.create(orderDetails);
            await OrderManager.processOrder(order);
            return order;
        }catch(error){
            if(error instanceof ValidationError) {
                throw new BadRequestError(`Validation failed: ${error.errors.map(e => e.message).join(', ')}`);
            }
            throw new InternalServerError();
        }
    }
    async getOrderDetails(orderId:string):Promise<IOrderAttributes>{
        try{
            const order = await this.orderRepository.findById(parseInt(orderId));
            if(!order){
                throw new NotFoundError('order','orderId',orderId);
            }
            return order;
        }catch(error:any){
            if(error instanceof ValidationError) {
                throw new BadRequestError(`Validation failed: ${error.errors.map(e => e.message).join(', ')}`);
            }
            if(error.name === 'SequelizeUniqueConstraintError'){
                throw new ConflictError('user with the given email or phone number already exists.');
            }
            throw new InternalServerError();
        }
    }

    async getAllOrderOfUser(userId:number):Promise<IOrderAttributes[]>{
        try {
            const orders  = await this.orderRepository.findByUserId(userId);
            if(!orders){
                throw new NotFoundError('user','userId',userId);
            }
            return orders;
        }catch(error){
            if(error instanceof GenericApiError){
                throw error;
            }
            throw new InternalServerError('An error occurred during the signin process.');
        }
    }
}

export {OrderService};