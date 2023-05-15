import express, {  Request, Response } from "express";
import Payment from "../../models/paymentModel";
import { Error } from "mongoose";
import axios from 'axios'

const router = express.Router();

const ordersServiceUrl="http://localhost:5002/api"

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




  // try {
    // const paymentExisted = await Payment.find({ orderId: req.body.orderId });
    // if (paymentExisted) {
    //   return res.json({ message: "Order is already paid" }).end();
    // }
  //   const  { orderId,amount,cardNumber}=req.body
  //   const newPayment = new Payment({
  //     orderId,amount,cardNumber
  //   }
    
  //   );
  //   // if (!newPayment) {
  //   //   throw new Error("Payment failed");
  //   // }
  //   await newPayment.save();
  //   // mark order as paid order
  //   console.log("before order payed")
  //   await axios.put(`${ordersServiceUrl}/api/orders/${req.body.orderId}`,req.body).then(()=>console.log("order payed"));
      
  //   return res.json(newPayment);
  // } catch (error:any) {
  //   console.log("error in payment")
  //     return res.status(500).json({ message: "Internal server error" }).end();
  // }
});

// export = router;
export default router


