import express from 'express';
import { createEvent, updateEvent, getEventById, removeEvent, listEvent } from '../controllers/eventController';
import requireAuth from '../middlewares/AuthMiddleware';
const eventRouter = express.Router();
// Define user routes
eventRouter.get('/list', requireAuth, listEvent);
eventRouter.get('/:eventId', requireAuth, getEventById);

// protected route
eventRouter.put('/update', requireAuth, updateEvent);
eventRouter.delete('/remove', requireAuth, removeEvent);

eventRouter.post('/create', requireAuth, createEvent);



export default eventRouter;
