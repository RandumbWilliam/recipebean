import nodemailer from "nodemailer";

export const createEmailTransporter = () => {
  let transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  return transporter;
};
