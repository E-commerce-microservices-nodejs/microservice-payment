import { Document } from 'mongoose';

interface Payment extends Document {
  idCommande: number;
  montant: number;
  numeroCarte: number;
}
export default Payment