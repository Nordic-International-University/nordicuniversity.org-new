import { NextResponse, NextRequest } from "next/server";

const VALID_API_KEY = process.env.X_API_KEY || "your-secret-api-key";

export function validateApiKey(req: Request) {
  const apiKey = req.headers.get("x-api-key");

  if (!apiKey || apiKey !== VALID_API_KEY) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid API Key" },
      { status: 401 },
    );
  }

  return null;
}
