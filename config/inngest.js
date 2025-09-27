import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/user";

// Inngest client
export const inngest = new Inngest({ id: "QuickCart-next" });

// Create
export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const d = event.data;
    const email = d?.email_addresses?.[0]?.email_address ?? null;

    const userData = {
      _id: d.id,
      email,
      name: [d.first_name, d.last_name].filter(Boolean).join(" "),
      imageUrl: d.image_url,
    };

    await connectDB();
    // กันซ้ำ: ถ้ามีอยู่แล้วก็อัปเดต
    await User.findByIdAndUpdate(d.id, { $set: userData }, { upsert: true, new: true });
  }
);

// Update
export const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const d = event.data;
    const email = d?.email_addresses?.[0]?.email_address ?? null;

    const userData = {
      email,
      name: [d.first_name, d.last_name].filter(Boolean).join(" "),
      imageUrl: d.image_url,
    };

    await connectDB();
    await User.findByIdAndUpdate(d.id, { $set: userData }, { new: true });
  }
);

// Delete
export const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },   // ← แก้ evnet -> event
  async ({ event }) => {
    const d = event.data;
    await connectDB();
    await User.findByIdAndDelete(d.id);  // ← ใส่ id
  }
);
