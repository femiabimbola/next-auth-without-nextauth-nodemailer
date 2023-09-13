import nodemailer from "nodemailer"
import User from "@/models/userModel"
import bcryptjs from 'bcryptjs'


export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // Created an hashed
    const hashedToken = await bcryptjs.hash(userId.toString(), 10)
    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 2400000,
      })
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 2400000,
      })
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "183846320e040a",
        pass: "50f185eef5474e"
      }
    });

    const mailOptions = {
      from: 'tush@gmail.com',
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your email",
      html: `<p> Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}"><here/a>
      to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}  `
    }

    const mailResponse = await transport.sendMail(mailOptions)
    return mailResponse
  } catch (error: any) {
    throw new Error(error.message);
  }
}