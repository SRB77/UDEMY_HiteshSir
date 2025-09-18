const mailgen = require('mailgen');
const nodemailer = require('nodemailer');


const sendMail = async(options)=>{
    const mailGenerator = new mailgen({
        theme:"default",
        product:{
            name:"Section21",
            link:"https://section21link.com"
        }
    })
    const emailTextual =  mailGenerator.generatePlaintext(options.mailgenContent);
    const emailHtml =  mailGenerator.generate(options.mailgenContent);


    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_SMTP_HOST,
      port:process.env.MAILTRAP_SMTP_PORT,
      auth:{
        user:process.env.MAILTRAP_SMTP_USER,
        pass:process.env.MAILTRAP_SMTP_PASSWORD
      }
    });

    const mail = {
      from: 'mail.sarumanoj86@gmail.com',
      to: options.email,
      subject: options.subject,
      text: emailTextual, // plain‑text body
      html: emailHtml, // HTML body
    };

    try {
        await transporter.sendMail(mail);
    } catch (error) {
        console.error("Email service Failed silently , This might have happened due to credentials check .env once ")
        console.error("Error :" , error);
    }

}

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "'Welcome to Mailgen! We\'re very excited to have you on board.' ",
      action: {
        instruction:
          'Please verify your email using the following button to move forward',
        button: {
          color: '#22BC66',
          text: 'Verify Your Email',
          link: verificationUrl,
        },
      },
      outro: "Don't reply to this email it's a computergeneated verification system"
    },
  };
};
const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: 'Request for the Reset your password',
      action: {
        instruction: 'Please click the button below to Reset the password ',
        button: {
          color: '#22BC66',
          text: 'Reset password',
          link: passwordResetUrl,
        },
      },
      outro:
        "Don't reply to this email it's a computergeneated Reset Password system",
    },
  };
};


module.exports = {emailVerificationMailgenContent,forgotPasswordMailgenContent,sendMail}