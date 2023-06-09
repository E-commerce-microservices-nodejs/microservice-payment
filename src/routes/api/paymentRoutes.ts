/* eslint-disable no-console */
import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import Payment from '../../models/paymentModel';
import sendEmailToCustomer from '../../services/publishToRabbitMq';

const router = express.Router();
dotenv.config();

router.get('/', (req: Request, res: Response) => {
  Payment.find()
    .then(payment => {
      res.json(payment);
    })
    .catch((error: Error) => {
      res.status(500).json({ error: error.message });
    });
});

router.post('/', async (req: Request, res: Response) => {
  try {
    // Process the payment logic using the payment details from req.body

    const { orderId, amount, cardNumber } = req.body;
    const newPayment = new Payment({
      orderId,
      amount,
      cardNumber,
    });

    // If payment is successful, mark the order as paid

    await Payment.insertMany([newPayment]);
    await axios
      .put(`${process.env.ORDERS_SERVER}/orders/${orderId}`)
      .then(() => {
        console.log(req.body);
        const customer = req.body.user;
        console.log(`sending email to ${customer.email}`);
        // eslint-disable-next-line no-void
        void sendEmailToCustomer(
          customer.email,
          customer.fullname,
          amount,
          'Payment Operation',
          orderId,
          // eslint-disable-next-line no-underscore-dangle
          newPayment._id
        );
      })

      .catch((er: Error) => {
        console.log('failed to process payment', er.message);
      });

    // Send the payment result back to the gateway
    res.json(newPayment);
  } catch (error) {
    // Handle errors and send an appropriate response
    res.status(500).json({ error: 'Failed to process payment' });
  }
});

// export = router;
export default router;
