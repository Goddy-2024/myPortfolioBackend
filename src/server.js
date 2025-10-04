import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["https://godswillomondiportfoliodev.netlify.app"],
  })
);
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Health status ok" });
});

app.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // or your verified domain
      to: process.env.RECEIVER_EMAIL,
      reply_to: email,
      subject: `${name} — ${subject}`,
      text: `
      From: ${name} (${email})
      Subject: ${subject}

      Message:
      ${message}
      `,
    });

    console.log("Email sent:", data);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Resend Error:", error);
    res.status(500).json({ message: "Failed to send email", error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
