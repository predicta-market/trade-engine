import express from 'express';
import {createEvent,fetchEvent,updateEvent} from '../controller';

const eventRoute = express.Router();

/**
 * @route   POST /api/event
 * @desc    Create a new event
 * @access  Admin
 */
eventRoute.post('/',createEvent);

/**
 * @route   POST /api/event/:id
 * @desc    Fetch details of an existing event
 * @access  Public
 */
eventRoute.get('/:id',fetchEvent);

/**
 * @route   PUT /api/event
 * @desc    update details of an existing event
 * @access  Admin
 */
eventRoute.put('/', updateEvent);

export default eventRoute;