import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const odooUrl = process.env.ODOO_URL || "http://localhost:8069";

    // Call Odoo logout endpoint
    await fetch(`${odooUrl}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const response = NextResponse.json({ success: true });

    // Clear session cookie
    response.cookies.delete("session_id");

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Logout failed" },
      { status: 500 }
    );
  }
}
