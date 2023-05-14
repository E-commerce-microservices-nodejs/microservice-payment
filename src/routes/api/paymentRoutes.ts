import express, {  Request, Response } from "express";
import Payment from "../../models/paymentModel";
import { Error } from "mongoose";
import axios from 'axios'

const router = express.Router();

const ordersServiceUrl="http://localhost:5002"

router.post("/", async (req: Request, res: Response) => {
  try {
    const paymentExisted = await Payment.find({ orderId: req.body.orderId });
    if (paymentExisted[0]) {
      return res.json({ message: "Order is already paid" }).end();
    }
    const newPayment = new Payment({
      ...req.body,
    });
    if (!newPayment) {
      throw new Error("Payment failed");
    }
    await newPayment.save();
    // mark order as paid order
    await axios.put(`${ordersServiceUrl}/orders/${req.body.orderId}`);

    return res.json(newPayment).end();
  } catch (error:any) {
      return res.status(500).json({ message: "Internal server error" }).end();
  }
});

// export = router;
export default router


