import {StatusCodes} from 'http-status-codes'
import { Request, Response } from 'express';
import { ErrorResponse, SuccessResponse,GenericApiError, InternalServerError } from '../common';
import {EventService} from '../data/core/service';


const eventService = new EventService();

const createEvent = async (req: Request, res: Response):Promise<any>=>{
    try{
        const event = await eventService.createEvent(req.body);
        const response = SuccessResponse(event);
        return res.status(StatusCodes.CREATED).json({
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

const fetchEvent = async (req: Request, res: Response):Promise<any>=>{
    try{
        const event = await eventService.fetchEvent(parseInt(req.params.id));
        const response = SuccessResponse(event);
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

const updateEvent = async (req: Request, res: Response):Promise<any>=>{
    try{
        const event = await eventService.updateEvent(req.body);
        const response = SuccessResponse(event);
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

export {createEvent,fetchEvent,updateEvent};