import { ValidationError } from '@sequelize/core';
import {IPriceRecord} from './model'; 
import PriceRecordRepository from './repository';
import {BadRequestError,ConflictError,InternalServerError, GenericApiError,NotFoundError} from '../../common';
import { Outcome } from '../core/model/types';


class PriceHistoryService{
    private priceRecordRepository:PriceRecordRepository
    constructor(){
        this.priceRecordRepository = new PriceRecordRepository();
    }
    async recordPriceChange(priceRecord:IPriceRecord){
        try{
            await this.priceRecordRepository.create(priceRecord.eventId,priceRecord.outcome,priceRecord.latestPrice);
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

    async getPriceHistory(eventId:number,outcome:Outcome): Promise<IPriceRecord[] | void>{
        try {
            const event  = await this.priceRecordRepository.getPriceHistory(eventId,outcome);
            if(event===null){
                throw new NotFoundError('event','eventId',eventId);
            }
            return event;
        }catch(error){
            if(error instanceof GenericApiError){
                throw error;
            }
            throw new InternalServerError('An error occurred during the signin process.');
        }
    }
}

export {PriceHistoryService};