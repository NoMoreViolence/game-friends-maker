import { createTransport, SendMailOptions, SentMessageInfo } from 'nodemailer';
import * as mailConfig from 'config/mail.config.json';

const caller = createTransport({
  service: 'Gmail',
  auth: {
    type: 'OAuth2',
    user: mailConfig.mailer.user,
    clientId: mailConfig.mailer.clientId,
    clientSecret: mailConfig.mailer.clientSecret,
    refreshToken: mailConfig.mailer.refreshToken,
    accessToken: mailConfig.mailer.accessToken,
    expires: 3600 
  }
});

const sendMail = (to: string, authentication: string): Promise<SentMessageInfo> => {
  const options: SendMailOptions = {
    from: { name: 'Game Friends Maker', address: mailConfig.mailer.user },
    to,
    subject: 'Game Friends Maker email authentication',
    html: `<h1>The authentication number is ${authentication}</h1>`
  };

  return caller.sendMail(options);
};

export { sendMail };
