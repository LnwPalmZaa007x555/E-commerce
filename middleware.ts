// middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

// ตัด /api/inngest ออกด้วย Negative Lookahead
export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api)(?!/inngest).*",   // ⬅️ exclude /api/inngest
  ],
};
