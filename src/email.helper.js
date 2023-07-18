const nodemailer=require("nodemailer");

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'lorenza22@ethereal.email',
      pass: 'rgSW2R4PPCstN6cuHj'
  }
});


const send=async(info)=>{
  return new Promise(async(resolve, reject)=>{
    try {
      let result= await transporter.sendMail(info);
      console.log("Message sent: %s", result.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
    } catch (error) {
      console.log(error);
      reject(error);
    }
  })
  
}
const emailProcessor=(clientEmail,pin)=>{
  const info = {
    from:'"EpitomeTRC" <lorenza22@ethereal.email>',
    to: clientEmail,
    subject: "Password Reset PIN",
    text: "Here is your password reset pin: "+pin+" This pin will expire in 24 hours",
    html: `<b>Hello</b><br/>
    Here is your  Password Reset PIN:<br/>
    <b>${pin}</b><br>
    <p>***Note***: This pin will expire in 24 hours</p>
    `,
  }

  return send(info);

}

module.exports={
    emailProcessor,
}