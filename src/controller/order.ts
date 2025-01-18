import {StatusCodes} from 'http-status-codes'
import { Request, Response } from 'express';
import { ErrorResponse, SuccessResponse,GenericApiError, InternalServerError } from '../common';
import {OrderService} from  '../data';

const orderService:OrderService = new OrderService();

const createOrder = async (req: Request, res: Response):Promise<any>=>{
    try{
        const order = orderService.createOrder(req.body);
        const response = SuccessResponse(order);
        return res.status(StatusCodes.CONTINUE).json({
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

const fetchOrder = async (req: Request, res: Response):Promise<any>=>{
    try{
        const order = orderService.getOrderDetails(req.params.id);
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

const fetchAllOrders = async (req: Request, res: Response):Promise<any>=>{
    try{
        const order = orderService.getAllOrderOfUser(req.body.user);
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

export {createOrder,fetchOrder,fetchAllOrders};