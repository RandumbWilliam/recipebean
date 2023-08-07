import { createEmailTransporter } from "./createEmailTransporter";

export const sendEmail = async (to: string, subject: string, html: string) => {
  return new Promise((resolve, reject) => {
    let transporter = createEmailTransporter();

    let options = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      html,
    };

    transporter.sendMail(options, (err) => {
      if (err) {
        console.log(err);
        return reject({ message: "An error has occured" });
      }
      return resolve({ message: "Email sent successfully" });
    });
  });
};
