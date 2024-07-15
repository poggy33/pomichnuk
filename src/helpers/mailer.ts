import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({email, emailType, userId}: any) => {
try {
    //create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if(emailType === "VERIFY") {
    await User.findByIdAndUpdate(userId, 
        {
            verifyToken: hashedToken, 
            verifyTokenExpiry: Date.now() + 3600000
        })
    } else if(emailType === "RESET") {
    await User.findByIdAndUpdate(userId, 
        {
            forgotPasswordToken: hashedToken, 
            forgotPasswordExpiry: Date.now() + 3600000
        })
    }

    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.USER_NODEMAILER,
          pass: process.env.PASS_NODEMAILER,
        }
    })

    // const mailOptions = {
    //     from: process.env.EMAIL_NODEMAILER,
    //     to: email,
    //     subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
    //     text: "Привіт", // plain text body
    //     html: `<p>Перейдіть за <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">посиланням</a> 
    //     щоб ${emailType === "VERIFY" ? "пройти верифікацію" : "Відновити пароль"}</p>`
    // }

    // const mailResponse = await transporter.sendMail(mailOptions);

    // return mailResponse;

} catch (error: any) {
    throw new Error(error.message)
}

}



