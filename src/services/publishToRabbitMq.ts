/* eslint-disable no-console */
import amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();
export default async function sendEmail(
  customerEmail: string,
  customerFullname: string,
  amount: number,
  subject: string,
  orderId: string,
  transactionId: string
): Promise<void> {
  const msgBuffer = Buffer.from(
    JSON.stringify({
      to: customerEmail,
      subject,
      fullname: customerFullname,
      amount,
      orderId,
      transactionId,
    })
  );
  try {
    const connection = await amqp.connect(`${process.env.RABBIT_MQ_URI}`);
    const channel = await connection.createChannel();
    await channel.assertQueue('email');
    channel.sendToQueue('email', msgBuffer);
    console.log('Sending message to email queue');
    await channel.close();
    await connection.close();
  } catch (ex) {
    console.error(ex);
  }
}
