import { Schema, model, Document } from 'mongoose';

interface Payment {
  _id?: string;
  orderId: string;
  amount: number;
  cardNumber: string;
}
interface PaymentDocument extends Document, Payment {
  _id: string;
}

const paymentSchema = new Schema<PaymentDocument>({
  orderId: { type: String, unique: true },
  amount: { type: Number, required: true },
  cardNumber: { type: String },
});

const Payment = model<PaymentDocument>('Payment', paymentSchema);

export default Payment;
