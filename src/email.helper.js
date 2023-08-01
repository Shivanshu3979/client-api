const nodemailer=require("nodemailer");

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'hettie51@ethereal.email',
      pass: 'sqCVMUAcrs6sz9NZn4'
  }
});


const send=async(info)=>{
  return new Promise(async(resolve, reject)=>{
    try {
      let result= await transporter.sendMail(info);
      console.log("Message sent: %s", result.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
      resolve(result);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  })
  
}

const emailProcessor=(clientEmail,username,pin,type)=>{
  switch(type){
    case "request-new-pass":
      const info = {
        from:'"EpitomeTRC" <lorenza22@ethereal.email>',
        to: clientEmail,
        subject: "Password Reset PIN",
        text: "Hello "+username+". Here is your password reset pin: "+pin+" This pin will expire in 24 hours",
        html: `<b>Hello ${username},</b><br/>
        Here is your  Password Reset PIN:<br/>
        <b>${pin}</b><br>
        <p>***Note***: This pin will expire in 24 hours</p>
        `,
      }
    
      return send(info);
    
    case "password-update-success":
      const info1 = {
        from:'"EpitomeTRC" <lorenza22@ethereal.email>',
        to: clientEmail,
        subject: "Password Updated",
        text: "Your new password has been updated",
        html: `<b>Hello</b><br/>
        Your password has been updated successfully<br/>
        <br>
        `,
      }
    
      return send(info1);
    default :
      break;
  }
  

}

module.exports={
    emailProcessor,
}