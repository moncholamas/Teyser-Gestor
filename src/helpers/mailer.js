import  nodemailer from 'nodemailer';

export let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: process.env.MAIL, 
      pass: process.env.TEYSERMAILPASS, 
    },
  });

