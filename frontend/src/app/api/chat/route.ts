import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Endpoint mock para el chat con IA.
// En producción, aquí se integrará la llamada a Claude, GPT-4, etc., y a la BD IMDADIC.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message: string = body.message ?? "";

    console.log("Sending request to backend:", { message });

    // Forward request to backend
    const backendResponse = await fetch("http://127.0.0.1:8000/api/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    console.log("Backend response status:", backendResponse.status);

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      console.error("Backend error details:", errorText);
      return NextResponse.json(
        { error: `Error connecting to backend service: ${backendResponse.status} ${backendResponse.statusText}` },
        { status: backendResponse.status }
      );
    }

    const data = await backendResponse.json();
    console.log("Backend data received:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
