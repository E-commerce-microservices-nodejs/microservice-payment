import { Document } from 'mongoose';

interface Payment extends Document {
  _id?:string,
  orderId:string;
  amount: number;
  cardNumber: string;


}
export default Payment