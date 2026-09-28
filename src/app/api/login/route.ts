import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { login, password } = body;

    console.log("=== LOGIN ATTEMPT ===");
    console.log("Received login:", login);
    console.log("Received password:", password);
    console.log("Body:", body);

    // Mock credentials for testing
    const validCredentials = [
      { login: "admin@dariora.com", password: "admin123" },
      { login: "admin", password: "admin" },
    ];

    console.log("Valid credentials:", validCredentials);

    const isValid = validCredentials.some((cred) => {
      console.log(`Checking: "${cred.login}" === "${login}" && "${cred.password}" === "${password}"`);
      return cred.login === login && cred.password === password;
    });

    console.log("Is valid:", isValid);

    if (!isValid) {
      console.log("LOGIN FAILED - Invalid credentials");
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    console.log("LOGIN SUCCESS");
    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: { id: 2, name: "Administrator", login, email: login },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
