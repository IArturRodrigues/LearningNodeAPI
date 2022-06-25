export interface IMailService {
   sendMail(message: IMessage): Promise<void>;
}

export interface IMessage {
   to: IAdress;
   from: IAdress;
   subject: string;
   body: string;
}

export interface IAdress {
   name: string;
   email: string;
}