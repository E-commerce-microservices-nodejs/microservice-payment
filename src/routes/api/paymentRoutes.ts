import express, {  Request, Response } from "express";
import Payment from "../../models/payment";
import { Error } from "mongoose";

const router = express.Router();


router.post("/", async (req: Request, res: Response) => {
  try {
    const paymentExisted = await Payment.find({ idCommande: req.body.idCommande });
    if (paymentExisted[0]) {
      return res.json({ message: "Commande is already paid" }).end();
    }
    const newPayment = new Payment({
      ...req.body,
    });
    if (!newPayment) {
      throw new Error("Payment failed");
    }
    await newPayment.save();
    return res.json(newPayment).end();
  } catch (error:any) {
      return res.status(500).json({ message: "Internal server error" }).end();
  }
});

// export = router;
export default router


