import "dotenv/config"
import { sendNewUserNotification } from "./utils/mailer"

async function test() {
  console.log("Testing mailer with:")
  console.log("GMAIL_USER:", process.env.GMAIL_USER)
  console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL)
  
  if (!process.env.GMAIL_PASS) {
    console.log("Error: GMAIL_PASS is not set. Please check your .env file.")
    return
  }

  console.log("Attempting to send a test email...")
  await sendNewUserNotification("Test User", "test@example.com")
  console.log("Test finished.")
}

test()
