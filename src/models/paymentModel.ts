
import { Schema, model, Model, Document } from 'mongoose';
import Payment from '../types/PaymentType';

interface PaymentModel extends Model<PaymentDocument> {}

interface PaymentDocument extends Payment {}

const paymentSchema = new Schema<PaymentDocument, PaymentModel>({
  orderId: { type: Number, unique: true },
  amount: { type: Number, required: true },
  cardNumber: { type: Number },
});

const Payment = model<PaymentDocument, PaymentModel>('Payment', paymentSchema);

export default Payment;
