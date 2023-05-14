import { Document } from 'mongoose';

interface Payment extends Document {
  orderId:number;
  amount: number;
  cardNumber: number;


}
export default Payment