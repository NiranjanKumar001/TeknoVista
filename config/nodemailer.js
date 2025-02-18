import nodemailer from 'nodemailer';

import { EMAIL_PASSWORD } from './env.js';

export const accountEmail = 'niranjankumarofficial003@gmail.com';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: accountEmail,
    pass: EMAIL_PASSWORD,
  },
  debug: true,  // Output SMTP connection logs to console
  logger: true
})

export default transporter;

//nodemailersetup