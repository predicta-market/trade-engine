import { Order,IOrderAttributes, IOrderCreationAttributes } from '../model';

class OrderRepository {
    async create(orderDetails: IOrderCreationAttributes): Promise<IOrderAttributes> {
        try{
            const order = await Order.create(orderDetails); 
            return order;
        }catch(error){
            throw error; 
        }
    }

    async findById(orderId: number): Promise<IOrderAttributes | null> {
        try{
            const order = await Order.findByPk(orderId); 
            return order; 
        }catch(error){
            throw error; 
        }
    }
    
    async findByUserId(userId: number): Promise<IOrderAttributes[]> {
        try{
            const orders = await Order.findAll({
                where: { userId },
            });
            return orders;
        }catch(error){
            throw error; 
        }
    }

    async update(orderId: number, updateDetails: Partial<IOrderCreationAttributes>): Promise<IOrderAttributes | null> {
        try {
            const order = await Order.findByPk(orderId); 
            if(!order){
                throw new Error('Order not found');
            }
            await order.update(updateDetails); 
            return order;
        } catch (error) {
            throw error;
        }
    }

    async delete(orderId: number): Promise<boolean>{
        try{
            const order = await Order.findByPk(orderId); 
            if(!order){
                throw new Error('Order not found');
            }
            await order.destroy();
            return true; 
        }catch(error){
            throw error; 
        }
    }
}

export { OrderRepository };