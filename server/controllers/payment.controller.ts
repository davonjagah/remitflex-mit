// importing relevant modules
import { Response, Request } from "express";
import Flutterwave from "flutterwave-node-v3";

import { defaultConfig } from "../config/config";
import axios from "axios"

const url = "https://min-api.cryptocompare.com/data/price?fsym=USDC&tsyms=NGN";
const headers = new Headers({
  "Content-Type": "application/json",
  Authorization: `Apikey ${defaultConfig.CC_API_KEY}` // Add any other headers as needed
});

const flw = new Flutterwave(defaultConfig.FLW_PUBLIC_KEY, defaultConfig.FLW_SECRET_KEY);

export const USDCNGNRate = async () => {
  // Fetch USDC rate
  const result = await fetch(url, {
    method: "GET",
    headers: headers
  });

  const data = await result.json();

  return data.NGN;
};

// Powered By Crypto Compare
export const getRate = async (req: Request, res: Response) => {
  const currentRate = await USDCNGNRate();

  //response
  res.status(200).json({
    rate: currentRate
  });
};

// Initialize a Bill payment transaction.
export const initializeBillPayment = async (req: Request, res: Response) => {
  const amount = req.body.amount;
  const rate = await USDCNGNRate();
  const amountUSD = Number((amount / rate).toFixed(2));

  try {
    const payload = {
      country: req.body.country,
      customer: req.body.customer,
      amount: req.body.amount,
      recurrence: req.body.recurrence,
      type: req.body.type,
      reference: req.body.reference
    };

    try {
      const response = await flw.Bills.create_bill(payload);
      

      res.status(200).json({
        message: "Transaction Initialized.",
        data: response
      });
    } catch (error) {
      res.status(500).json({
        error: {
          message: "Couldn't initialize Bill Payment, Please Contact Support",
          error
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      error: {
        message: "Couldn't initialize transaction from Linkvault."
      }
    });
  }
};

//Get Bank List
export const getBanks = async (req: Request, res: Response) => {
  try {
    const payload = { country: "NG" };

    const response = await flw.Bank.country(payload);
    res.status(200).json({
      data: response
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: "Error Fetching Banks"
      }
    });
  }
};

//Resolve Customers Account

export const resolveAccount = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const response = await flw.Misc.verify_Account(payload);
    res.status(200).json({
      data: response
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: "Couldnt Resolve User"
      }
    });
  }
};

// Initialize a Bill payment transaction.
export const initializePayment = async (req: Request, res: Response) => {
    const { account_bank, account_number, amount, narration, currency, reference, callback_url, debit_currency } = req.query;
  try {
    
    const payload = {
        account_bank: account_bank,
        account_number: account_number,
        amount: amount,
        narration: narration,
        currency: currency,
        reference: reference,
        callback_url: callback_url,
        debit_currency: debit_currency
      };
    try {
      const response = await flw.Transfer.initiate(payload);
   
      res.status(200).json({
        message: "Transaction Initialized.",
        data: response
      });
    } catch (error) {
      res.status(500).json({
        error: {
          message: "Couldn't initialize Remit Payment, Please Contact Support"
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        message: "Couldn't initialize transaction"
      }
    });
  }
};

export const createInvoice=async (req:Request, res:Response) => {
    try {
      // Extract invoiceData from request body
      const { account_bank, account_number, amount, narration, currency, reference, callback_url, debit_currency } = req.body;
      const rate = await USDCNGNRate();
      const amountUSD = Number((amount / rate).toFixed(2));

     // Construct URL with query parameters
     const redirectUrl = `https://remitflex.com/api/v1/remit?account_bank=${account_bank}&account_number=${account_number}&amount=${amount}&narration=${narration}&currency=${currency}&reference=${reference}&callback_url=${callback_url}&debit_currency=${debit_currency}`;
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