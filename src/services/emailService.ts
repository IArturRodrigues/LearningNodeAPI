import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { dbConfig } from '@configs/database';
import { IMailService, IMessage } from '@interfaces/mailService';

interface MailtrapConstructor {
   new(): IMailService;
   (): void;
}

var transporter: Mail;

const mailtrapMailService = function(this: IMailService) {
   transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
         user: "487f9ac1017b63",
         pass: "5e156ada7c1298"
      }
   });
} as MailtrapConstructor

mailtrapMailService.prototype.sendMail = async (message: IMessage) => {
   transporter.sendMail({
      to: {
         name: message.to.name,
         address: message.to.email
      },
      from: {
         name: message.from.name,
         address: message.from.email
      },
      subject: message.subject,
      html: message.body
   });
}

export default mailtrapMailService;