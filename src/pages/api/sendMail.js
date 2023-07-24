const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  // host: "smtp.ethereal.email",
  service: 'gmail',
  host:'smtp.gmail.com',
  secure:false,
  port: process.env.NEXT_PUBLIC_HOST_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: `${process.env.NEXT_PUBLIC_AUTH_USER}`,
    pass: `${process.env.NEXT_PUBLIC_AUTH_PASSWORD}`
},
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  var mailOptions = {
    from: req.body.email,
    to: 'tanuja.gurung449@gmail.com',
   // phone: req.body.phone ? req.body.phone : "",
    subject: req.body.subject, // Subject line
    text: req.body.message,
  };

  let info = await transporter.sendMail(mailOptions);

  res.status(200).json(info.messageId);
}
