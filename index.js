const express = require ("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


app.get("/", (req, res) => {
    res.send("Hello");
});

app.post("/", async(req, res ) => {
    const {email} = req.body;
     // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'madge.cassin83@ethereal.email', // generated ethereal user
      pass: 'CdvM8xYY2UCWcpT9eD', // generated ethereal password
    },
  });
  const msg = {
    from: '"The Express App" <theExprssapp@example.com>', // sender address
    to: `${email}`, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello Keep up the good work ", // plain text body
    
  }

  // send mail with defined transport object
  const info = await transporter.sendMail(msg);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...


    res.send("Email sent!!")
});


app.listen(port, () => console.log(`Testing app listening @ ${port}`))