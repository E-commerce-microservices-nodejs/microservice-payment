
import { Schema, model, Model, Document } from 'mongoose';
import Payment from '../types/Payment';

interface PaymentModel extends Model<PaymentDocument> {}

interface PaymentDocument extends Payment {}

const paymentSchema = new Schema<PaymentDocument, PaymentModel>({
  idCommande: { type: Number, unique: true },
  montant: { type: Number, required: true },
  numeroCarte: { type: Number },
});

const Payment = model<PaymentDocument, PaymentModel>('Payment', paymentSchema);

export default Payment;
