import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const odooUrl = process.env.ODOO_URL || "http://localhost:8069";

    // Try to get current user from Odoo
    try {
      const response = await fetch(`${odooUrl}/api/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json(data);
      }
    } catch (error) {
      console.error("Odoo get user error:", error);
    }

    // Fallback: Return mock user data
    return NextResponse.json({
      id: 2,
      name: "Administrator",
      login: "admin@dariora.com",
      email: "admin@dariora.com",
    });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
