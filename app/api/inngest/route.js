import { serve } from "inngest/next";
import { inngest, syncUserCreation, syncUserDeleted, syncUserUpdation } from "@/config/inngest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [syncUserCreation, syncUserUpdation, syncUserDeleted],
});
