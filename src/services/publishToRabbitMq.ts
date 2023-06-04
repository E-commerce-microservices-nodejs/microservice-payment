import amqp from 'amqplib'
import dotenv from 'dotenv'
dotenv.config()
export default async function sendEmail(customer_email:string,customer_fullname:string,amount:number,subject:string,orderId:string,transactionId:string) {
    const msgBuffer = Buffer.from(
      JSON.stringify({
        to: customer_email,
        subject: subject,
        fullname:customer_fullname,
        amount,
        orderId,
        transactionId

  
      })
    );
    try {
      const connection = await amqp.connect(`${process.env.RABBIT_MQ_URI}`);
      const channel = await connection.createChannel();
      await channel.assertQueue("email");
      channel.sendToQueue("email", msgBuffer);
      console.log("Sending message to email queue");
      await channel.close();
      await connection.close();
    } catch (ex) {
      console.error(ex);
    }
  }
  