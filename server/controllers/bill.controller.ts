import Flutterwave from "flutterwave-node-v3";
import { defaultConfig } from "../config/config";
import { Request, Response } from 'express';
import { USDCNGNRate } from "./payment.controller";
import axios from "axios";

const flw = new Flutterwave(defaultConfig.FLW_PUBLIC_KEY, defaultConfig.FLW_SECRET_KEY);

const getBillsCategories = async (req: Request, res: Response) => {


    try {
        const response = await flw.Bills.fetch_bills_Cat()
        res.status(200).json({
            data:response
        })
    } catch (error) {
        console.log(error)
    }
}
const getBillsCategory= async (req:Request, res: Response)=>{
    const country=req.body.country;
    const category=req.body.category;

    try {
        const response = await flw.Bills.fetch_bills_Cat()
        const bills=response.data;
        const streamLined=bills.map((bill)=>{
           
            if(category=='airtime'){    
                if(country=='NG' && bill.country==country && bill.biller_code=='BIL099'){
                 return bill;
                }
                if(country=='GH' && bill.country==country){
                    if(bill.biller_code=='BIL132' || bill.biller_code=='BIL133' || bill.biller_code=='BIL134' ){
                        return bill
                    }
                }
                if(country=='UG' && bill.country==country){
                    if(bill.biller_code=='BIL153' || bill.biller_code=='BIL154' || bill.biller_code=='BIL155' ){
                        return bill
                    }
                }
                if(country=='ZM' && bill.country==country){
                    if(bill.biller_code=='BIL196' || bill.biller_code=='BIL197' || bill.biller_code=='BIL198' ){
                        return bill
                    }
                }
                if(country=='KE' && bill.country==country){
                    if(bill.biller_code=='BIL189' || bill.biller_code=='BIL187'){
                        return bill
                    }
                }                
            }
            else if(category=='data'){
                if(country=='NG' && bill.country==country){
                    if(bill.biller_code=='BIL108' || bill.biller_code=='BIL109' || bill.biller_code=='BIL110' || bill.biller_code=='BIL111' || bill.biller_code=='BIL111'){
                        return bill
                    }
                }
                   if(country=='UG' && bill.country==country){
                       if(bill.biller_code=='BIL161' || bill.biller_code=='BIL162' || bill.biller_code=='BIL163' ){
                           return bill
                       }
                   }  
            }
            else if(category=='electricity'){
                if(country=='NG' && bill.country==country){
                    if(bill.biller_code=='BIL112' || bill.biller_code=='BIL113' || bill.biller_code=='BIL114' || bill.biller_code=='BIL115' || bill.biller_code=='BIL116' || bill.biller_code=='BIL117' || bill.biller_code=='BIL118' || bill.biller_code=='BIL120'){
                        return bill
                    }
                }
                   if(country=='GH' && bill.country==country){
                       if(bill.biller_code=='BIL142'){
                           return bill
                       }
                   }
                   if(country=='UG' && bill.country==country){
                       if(bill.biller_code=='BIL158' || bill.biller_code=='BIL159'){
                           return bill
                       }
                   }
                   if(country=='ZM' && bill.country==country){
                       if(bill.biller_code=='BIL202'){
                           return bill
                       }
                   }
                   if(country=='KE' && bill.country==country){
                       if(bill.biller_code=='BIL191'){
                           return bill
                       }
                   }   
            }
            else if(category=='cable'){
                if(country=='NG' && bill.country==country){
                    if(bill.biller_code=='BIL121' || bill.biller_code=='BIL122'){
                        return bill
                    }
                }
                   if(country=='GH' && bill.country==country){
                       if(bill.biller_code=='BIL137' || bill.biller_code=='BIL138'){
                           return bill
                       }
                   }
                   if(country=='UG' && bill.country==country){
                       if(bill.biller_code=='BIL156' || bill.biller_code=='BIL157'){
                           return bill
                       }
                   }
                   if(country=='ZM' && bill.country==country){
                       if(bill.biller_code=='BIL200' || bill.biller_code=='BIL201'){
                           return bill
                       }
                   }
                   if(country=='KE' && bill.country==country){
                       if(bill.biller_code=='BIL190' || bill.biller_code=='BIL192'){
                           return bill
                       }
                   }   
            }
            else if(category=='internet'){
                if(country=='NG' && bill.country==country){
                    if(bill.biller_code=='BIL126' || bill.biller_code=='BIL129' || bill.biller_code=='BIL124'){
                        return bill
                    }
                }
                   if(country=='GH' && bill.country==country){
                       if(bill.biller_code=='BIL139' || bill.biller_code=='BIL141'){
                           return bill
                       }
                   }
            }
        })
        res.status(200).json({
            data:streamLined.filter(bill=>bill!= null)
        })
    } catch (error) {
        console.log(error)
    }
    
}
const getStatus = async (req: Request, res: Response) => {

    try {
        const payload={
            "reference": req.params.reference,
        }
        
        const response = await flw.Bills.fetch_status(payload)
        res.status(200).json({
            data:response
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:{
                message:'Couldnt fetch payment agencies'
            }
        })
    }

}



const paymentAgencies = async (req: Request, res: Response) => {

    try {
    
        const response = await flw.Bills.fetch_bills_agencies()
        res.status(200).json({
            data:response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:{
                message:'Couldnt fetch payment agencies'
            }
        })
    }

}

const createBill = async (req: Request, res: Response) => {
    try {
        const payload=req.query
        const response = await flw.Bills.create_bill(payload)
            res.status(200).json({
                data: response
            })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:{
                message:'Couldnt make Bill Payment'
            }
        })
    }

}
const createBillCashback = async (req: Request, res: Response) => {
    try {
        const payload=req.body
            const response = await flw.Bills.create_bill(payload)
            res.status(200).json({
                data: response
            })   
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:{
                message:'Couldnt make Bill Payment'
            }
        })
    }

}

const validateBill = async (req:Request, res:Response) => {
    try {
        const payload = req.body

        const response = await flw.Bills.validate(payload)
        res.status(200).json({
            data: response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:{
                message:'Couldnt Validate Customer'
            }
        })
    }

}

const getBillsPayment = async (req:Request, res:Response) => {

    try {

        const payload = req.body

        const response = await flw.Bills.fetch_status(payload)
        res.status(200).json({
            data: response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:{
                message:'Couldnt get Bill Payments'
            }
        })
    }

}



const amountToBePaid = async (req:Request, res:Response) => {

    try {

        const payload = req.body

        const response = await flw.Bills.amt_to_be_paid(payload)
        res.status(200).json({
            data:response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:{
                message:'Couldnt Resolve amount'
            }
        })
    }
}

// get bill payment
const getBillPayment = async (reference:any) => {

    try {

        const payload = {
            reference
        }

        const response = await flw.Bills.fetch_status(payload)
        console.log(response)
        return response;

    } catch (error) {
        console.log(error)
        
    }

}

export const createBillInvoice=async (req:Request, res:Response) => {
    try {
      // Extract invoiceData from request body
      const { country, customer, amount, amount_paid, recurrence, type, reference } = req.body;
      const rate = await USDCNGNRate();
      const amountUSD = Number((amount / rate).toFixed(2));

     // Construct URL with query parameters
     const redirectUrl = `https://remitflex.com/api/v1/pay-bill?country=${country}&customer=${customer}&amount=${amount}&amount_paid=${amount_paid}&recurrence=${recurrence}&type=${type}&reference=${reference}`;
     const notificationUrl=`https://remitflex.com/processing`
  
      // Create invoiceData object
      const invoiceData = { amount:amountUSD.toString(), currency:"USD", notificationUrl, redirectUrl };
  
      // Authenticate with Basic Authentication
      const username = defaultConfig.USERNAME; // Replace with your BTCPay Server username
      const password = defaultConfig.PASSWORD; // Replace with your BTCPay Server password
      const auth = Buffer.from(`${username}:${password}`).toString('base64');
      
      // Make API request to create invoice
      const response = await axios.post(`${defaultConfig.BTCPAY_SERVER_URL}/stores/${defaultConfig.STORE_ID_OR_TOKEN}/invoices`, invoiceData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`,
        },
      });
  
      // Return the created invoice details
      res.status(200).json(response.data);
    } catch (error) {
      // Handle errors
      console.error('Error creating invoice:', error.response ? error.response.data : error.message);
      res.status(500).send('Error creating invoice');
    }
}

// export 
 export{getBillsCategories, getBillsCategory, 
        getStatus, paymentAgencies, 
        amountToBePaid, createBill, createBillCashback,
        validateBill, getBillsPayment, getBillPayment}


