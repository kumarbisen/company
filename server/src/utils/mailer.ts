import nodemailer from "nodemailer"

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
})

export const sendNewUserNotification = async (userName: string, userEmail: string) => {
  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) return

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: adminEmail,
    subject: `New User Registration: ${userName}`,
    text: `A new user has registered on KunalConnects.\n\nName: ${userName}\nEmail: ${userEmail}\nTime: ${new Date().toLocaleString()}`,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`Notification sent for new user: ${userEmail}`)
  } catch (error) {
    console.error("Error sending new user notification email:", error)
  }
}

export const sendNewMessageNotification = async (userName: string, userEmail: string, message: string) => {
  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) return

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: adminEmail,
    subject: `New Workspace Message from ${userName}`,
    text: `You have received a new message in the workspace.\n\nFrom: ${userName} (${userEmail})\nMessage: ${message}\nTime: ${new Date().toLocaleString()}`,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`Notification sent for new message from: ${userEmail}`)
  } catch (error) {
    console.error("Error sending new message notification email:", error)
  }
}
