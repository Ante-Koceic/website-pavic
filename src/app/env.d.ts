declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SITE_URL: string;
    EMAIL_TO: string;
    RESEND_API_KEY: string;
    FORM_EMAIL_FROM: string;
  }
}
