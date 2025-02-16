import { createTransport } from "nodemailer";
import { toPositiveNumber } from "./utils";
import { render } from "jsx-email";
import OrderCreatedEmail from "../components/emails/OrderCreatedEmail";

type OrderCreatedEmailOptions = {
  createdAt: string;
  phone: string;
  wilaya: string;
  town: string;
  orderCode: string;
  products: string[];
};

export const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT ? toPositiveNumber(process.env.SMTP_PORT) : 587,
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
  logger: true,
});

export const sendOrderCreatedEmail = async (args: OrderCreatedEmailOptions) => {
  try {
    const html = await render(OrderCreatedEmail(args));

    const data = await transporter.sendMail({
      to: process.env.GOOGLE_ADMIN_EMAIL,
      from: `${process.env.SMTP_USER}`,
      subject: "Nouvelle commande",
      html,
    });
    console.log("Email successfully sent: %s", data.messageId);
    return data;
  } catch (error) {
    throw new Error(
      `Error while generating/sending order creation email: ${error}`,
    );
  }
};
