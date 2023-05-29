import express, {  Request, Response } from "express";
import Payment from "../../models/paymentModel";
import axios from 'axios'
import dotenv from 'dotenv';


const router = express.Router();
dotenv.config();
const ordersServiceUrl=`${process.env.ORDERS_SERVER}`;

router.post("/", async (req: Request, res: Response) => {

  try {
    // Process the payment logic using the payment details from req.body
    // const paymentResult = await processPayment(req.body);
  const  { orderId,amount,cardNumber}=req.body
    const newPayment = new Payment({
      orderId,amount,cardNumber
    })
    // If payment is successful, mark the order as paid
    // if (newPayment) {
      await axios.put(`${ordersServiceUrl}/orders/${req.body.orderId}`);
    // }
    // Send the payment result back to the gateway
    res.json(newPayment);
  } catch (error) {
    // Handle errors and send an appropriate response
    res.status(500).json({ error: 'Failed to process payment' });
  }

});

// export = router;
export default router


