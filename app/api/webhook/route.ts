import { NextResponse } from "next/server";
import crypto from "crypto";
import { exec } from "child_process";

const SECRET = process.env.SECRET_KEY || "secret";

export async function POST(req: Request) {
  try {
    const signature = req.headers.get("x-hub-signature-256");
    const payload = await req.text();

    const hmac = crypto.createHmac("sha256", SECRET);
    const digest = `sha256=${hmac.update(payload).digest("hex")}`;

    if (signature !== digest) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 },
      );
    }

    const body = JSON.parse(payload);
    console.log("Webhook payload:", body);

    if (body.ref === "refs/heads/main") {
      console.log("Deploying...");

      exec("sh deploy.sh", (error, stdout, stderr) => {
        if (error) {
          console.error(`Deployment error: ${error.message}`);
          return;
        }
        console.log(`Deployment stdout: ${stdout}`);
        console.error(`Deployment stderr: ${stderr}`);
      });
    }

    return NextResponse.json({ message: "Webhook processed" });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
