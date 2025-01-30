import { NextResponse } from "next/server";
import crypto from "crypto";

const SECRET = process.env.SECRET_KEY || "secret";

export async function POST(req: Request) {
  try {
    const signature = req.headers.get("x-hub-signature-256");
    if (!signature) {
      console.error("Signature header is missing.");
      return NextResponse.json(
        { message: "Signature header missing" },
        { status: 401 },
      );
    }

    // JSON body ni olish
    const payload = await req.text();
    console.log("Received payload:", payload);

    // HMAC imzosini hisoblash
    const hmac = crypto.createHmac("sha256", SECRET);
    const digest = `sha256=${hmac.update(payload).digest("hex")}`;
    console.log("Computed digest:", digest);
    console.log("");
    // Imzoni solishtirish
    if (signature !== digest) {
      console.error("Invalid signature.");
      console.log("Received signature:", signature);
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 },
      );
    }

    // Agar imzo to‘g‘ri bo‘lsa:
    console.log("Signature is valid. Processing payload...");
    return NextResponse.json({ message: "Webhook processed" });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
