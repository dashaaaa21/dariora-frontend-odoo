import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const odooUrl = process.env.ODOO_URL || "http://localhost:8069";

    const response = await fetch(`${odooUrl}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    const data = await response.json();

    const apiResponse = NextResponse.json(data, { status: response.status });
    
    // Forward cookies from Odoo
    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      apiResponse.headers.set("set-cookie", setCookieHeader);
    }

    return apiResponse;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
