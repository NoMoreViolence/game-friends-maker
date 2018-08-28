import { createTransport, SendMailOptions, SentMessageInfo } from 'nodemailer';
import * as mailConfig from 'config/mail.config.json';

const caller = createTransport({
  service: 'Gmail',
  auth: {
    user: mailConfig.mailer.user,
    pass: mailConfig.mailer.password
  }
});

const sendMail = (to: string, authentication: string): Promise<SentMessageInfo> => {
  const options: SendMailOptions = {
    from: `Game Friends Maker email authentication <${mailConfig.mailer.user}>`,
    to,
    subject: 'Game Friends Maker email authentication',
    text: authentication
  };

  return caller.sendMail(options);
};

export { sendMail };
