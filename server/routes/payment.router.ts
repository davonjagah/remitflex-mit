// importing relevant modules
import express from 'express';
import {  initializePayment, createInvoice } from '../controllers/payment.controller';

// creating 'mock-up' payment route
const paymentRouter = express.Router();



// Initialize new payment.
paymentRouter.post('/initialize', initializePayment);
paymentRouter.post('/invoice/create/', createInvoice);





export default paymentRouter;