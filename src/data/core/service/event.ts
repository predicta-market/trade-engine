import { ValidationError } from '@sequelize/core';
import {BadRequestError,ConflictError,InternalServerError, GenericApiError} from '../../../common';
import { IEventCreationAttributes,IEventAttributes } from '../..';
import {EventRepository} from '../repository';
import { NotFoundError } from '../../../common';


class EventService{
    private eventRepository:EventRepository
    constructor(){
        this.eventRepository = new EventRepository();
    }
    async createEvent(eventDetails:IEventCreationAttributes):Promise<IEventAttributes>{
        try{
            const event = await this.eventRepository.create(eventDetails);
            return event;
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

    async fetchEvent(eventId:number):Promise<IEventAttributes>{
        try {
            const event  = await this.eventRepository.findById(eventId);
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

    async updateEvent(eventDetails:IEventAttributes):Promise<IEventAttributes>{
        try {
            const eventId = eventDetails.id;
            const event = await this.eventRepository.findById(eventId);
            if(!event){
                throw new NotFoundError('event','eventId',eventId);
            }
            const updatedEvent = await this.eventRepository.update(eventId, eventDetails);
            if(!updatedEvent){
                throw new NotFoundError('event','eventId',eventId);
            }
            return updatedEvent;
        }catch(error){
            if(error instanceof GenericApiError){
                throw error;
            }
            throw new InternalServerError('An error occurred during the signin process.');
        }
    }
}

export {EventService};