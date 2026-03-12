import { ConfirmationEmailTemplate } from "../components/ConfirmationEmailTemplate";
import { EmailTemplate } from "../components/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailProps {
  name: string;
  email: string;
  message: string;
}

interface SendConfirmationEmailProps {
  name: string;
  email: string;
}

export const sendEmail = async ({ name, email, message }: SendEmailProps) => {
  const { data, error } = await resend.emails.send({
    from: process.env.FORM_EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: "Message from a client",
    react: <EmailTemplate name={name} email={email} message={message} />,
  });

  console.log("ERROR", error, data);

  if (error) {
    throw error;
  }
};

export const sendConfirmationEmail = async ({
  name,
  email,
}: SendConfirmationEmailProps) => {
  const { data, error } = await resend.emails.send({
    from: process.env.FORM_EMAIL_FROM,
    to: email,
    subject: "Confirmation email",
    react: <ConfirmationEmailTemplate name={name} />,
  });

  console.log("ERROR", error, data);

  if (error) {
    throw error;
  }
};
