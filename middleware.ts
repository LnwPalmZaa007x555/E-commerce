// middleware.ts (ที่ root หรือ src/middleware.ts)
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function isPublic(req: NextRequest) {
  const p = req.nextUrl.pathname;
  return p === '/api/inngest' || p.startsWith('/api/inngest/');
}

export default async function middleware(req: NextRequest) {
  // ปล่อย Inngest เสมอ
  if (isPublic(req)) return NextResponse.next();

  // ตรวจ session ด้วย Clerk
  const { userId, redirectToSignIn } = await auth();
  if (!userId) {
    // ถ้าไม่ล็อกอินให้ส่งไปหน้า sign-in
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
};
