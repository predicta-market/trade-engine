import { IEventCreationAttributes, IEventAttributes,Event } from '../model'; 

class EventRepository {
    async create(eventDetails: IEventCreationAttributes): Promise<IEventAttributes> {
        try{
            const event = await Event.create(eventDetails); 
            return event;
        }catch (error) {
            throw error; 
        }
    }

    async findById(eventId: number): Promise<IEventAttributes | null> {
        try{
            const event = await Event.findByPk(eventId);
            return event;
        }catch(error){
            throw error;
        }
    }

    async update(eventId: number, eventDetails: IEventCreationAttributes): Promise<IEventAttributes | null> {
        try {
            const event = await Event.findByPk(eventId);
            if(!event){
                throw new Error('Event not found');
            }
            await event.update(eventDetails);
            return event;
        }catch (error){
            throw error;
        }
    }

    async delete(eventId: number): Promise<boolean> {
        try {
            const event = await Event.findByPk(eventId);
            if (!event) {
                throw new Error('Event not found');
            }

            await event.destroy();
            return true;
        } catch (error) {
            throw error;
        }
    }

    async findAll(): Promise<IEventAttributes[]>{
        try{
            const events = await Event.findAll(); 
            return events;
        }catch (error) {
            throw error;
        }
    }
}

export {EventRepository};