import express,{Request,Response} from 'express';
import eventRoute from './event';
import orderRoute from './order';
import priceHistoryRoute from './price-history';
const router = express.Router();

router.use('/event',eventRoute);
router.use('/order',orderRoute);
router.use('/price-history',priceHistoryRoute);

router.get('/check', (_req: Request, res: Response)=>{
    const currentDateTime = new Date().toISOString(); 
    res.status(200).json({ 
        status: 'success', 
        message: 'user-management microservice is operational.',
        datetime: currentDateTime 
    });
});

export default router;