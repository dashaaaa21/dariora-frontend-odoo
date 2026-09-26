let csrfToken: string | null = null;

async function getCsrfToken() {
  if (csrfToken) return csrfToken;
  
  try {
    const response = await fetch("/api/csrf-token", {
      credentials: "include",
    });
    const data = await response.json();
    csrfToken = data.csrf_token;
    return csrfToken;
  } catch (error) {
    console.warn("[API] Failed to get CSRF token:", error);
    return null;
  }
}

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  try {
    console.log(`[API] Fetching ${endpoint}`, options);
    
    const method = (options.method || "GET").toUpperCase();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    // For POST/PUT/DELETE, add CSRF token
    if (["POST", "PUT", "DELETE"].includes(method)) {
      const token = await getCsrfToken();
      if (token) {
        (headers as Record<string, string>)["X-CSRF-Token"] = token;
      }
    }

    const response = await fetch(
      endpoint,
      {
        ...options,
        method,
        credentials: "include",
        headers,
      }
    );

    console.log(`[API] Response status: ${response.status}`, {
      headers: {
        contentType: response.headers.get("Content-Type"),
      }
    });

    // Try to parse JSON response
    let data;
    try {
      data = await response.json();
    } catch (e) {
      // If response is not JSON, throw error with status
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return { status: response.status };
    }

    if (!response.ok) {
      throw new Error(
        data.error || data.message || `HTTP ${response.status}`
      );
    }

    return data;
  } catch (error) {
    console.error(`[API] Error:`, error);
    if (error instanceof TypeError) {
      // Network error or CORS issue
      throw new Error("Network error - check that backend is running and CORS is configured");
    }
    throw error;
  }
}
