import { serve } from "inngest/next";
import { inngest, syncUserCreation, syncUserUpdation, syncUserDeletion, createUserOrder } from "@/config/inngest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [syncUserCreation, 
    syncUserUpdation, 
    syncUserDeletion,
    createUserOrder
  ],
});
