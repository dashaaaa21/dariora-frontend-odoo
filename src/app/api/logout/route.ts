import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const odooUrl = process.env.ODOO_URL || "http://localhost:8069";
    const sessionCookie = request.headers.get("cookie");

    const response = await fetch(`${odooUrl}/api/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(sessionCookie && { cookie: sessionCookie }),
      },
      credentials: "include",
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
