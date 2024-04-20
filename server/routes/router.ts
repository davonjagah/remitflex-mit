import express from "express";
import billRouter from "./bill.router";
import paymentRouter from "./payment.router";


const router = express.Router();
const apiPath="/api/v1";

router.use(`${apiPath}/payment`, paymentRouter);
router.use(`${apiPath}/bill`, billRouter);

export {router}