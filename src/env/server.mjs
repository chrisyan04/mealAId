import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string().url(),
    VALIDATION_SECRET: z.string(),
    DATABASE_NAME: z.enum(["prod", "dev", "local"]).default("local"),
    GMAIL_USER: z.string().email().optional(),
    GMAIL_PASSWORD: z
      .string()
      .length(16, "Please enter a valid app-specific password")
      .optional(),
    EMAIL_BANNER_IMAGE_URL: z.string().url().optional(),
  },
  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    VALIDATION_SECRET: process.env.VALIDATION_SECRET,
    DATABASE_NAME: process.env.DATABASE_NAME,
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    EMAIL_BANNER_IMAGE_URL: process.env.EMAIL_BANNER_IMAGE_URL,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
