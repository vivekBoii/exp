const nodeMailer = require("nodemailer");

const sendEmail = async(options) =>{

    const transporter = nodeMailer.createTransport({
        service:"gmail",
        host:"smtp.gmail.com",
        port:587,
        auth: {
            user:process.env.SMPT_MAI,
            pass:process.env.SMPT_PASSWORD
        }
    });

    transporter.verify(function(error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });

    const mailOptions ={
        from:"hiddentruthvivek@gmail.com",
        to:options.email,
        subject:options.subject,
        text:options.message
    }

    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;