import express from 'express';
import {fetchpriceHistory} from '../controller';

const priceHistoryRoute = express.Router();

/**
 * @route   /api/event-price-history?eventId=2&outcome=yes
 * @desc    Fetch all historical data of event id
 * @access  Public
 */
priceHistoryRoute.get('/',fetchpriceHistory);

export default priceHistoryRoute;