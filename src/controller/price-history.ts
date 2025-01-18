import {StatusCodes} from 'http-status-codes'
import { Request, Response } from 'express';
import { ErrorResponse, SuccessResponse,GenericApiError, InternalServerError, BadRequestError } from '../common';
import {Outcome, PriceHistoryService} from  '../data';

const priceHistoryService:PriceHistoryService = new PriceHistoryService();


const fetchpriceHistory = async (req: Request, res: Response):Promise<any>=>{
    try{
        const { eventId, outcome } = req.query;

        if(!eventId || !outcome){
            throw new BadRequestError('Please provide event id and outcome');
        }
        if(typeof eventId !== 'string') {
            throw new BadRequestError('Please provide event id and outcome');
        }
      
        if(!Object.values(Outcome).includes(outcome as Outcome)) {
            throw new BadRequestError('Invalid outcome. Must be one of the valid enum values.');
        }

        const order = priceHistoryService.getPriceHistory(parseInt(eventId),outcome as Outcome);
        const response = SuccessResponse(order);
        return res.status(StatusCodes.OK).json({
            status: 'success',
            data: response,
        });
    }catch(error){
        if(error instanceof GenericApiError){
            return res.status(error.statusCode).json({
                error:ErrorResponse(error)
            });
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error:new InternalServerError()
        });
    }
}


export {fetchpriceHistory};