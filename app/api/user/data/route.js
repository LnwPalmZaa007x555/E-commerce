import connectDB from "@/config/db";
import User from "@/models/user";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { userId } = auth();        // ✅ อ่านจากคุกกี้ Clerk
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthenticated" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(userId).lean();
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    // ✅ ส่ง userId กลับมาด้วย เพื่อดูใน Network ได้ชัดเจน
    return NextResponse.json({ success: true, user, userId }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error?.message ?? "Internal error" }, { status: 500 });
  }
}
