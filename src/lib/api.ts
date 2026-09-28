export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  try {
    console.log(`[API] Fetching ${endpoint}`, options);
    
    // Use relative URL - Next.js will proxy it to backend
    const response = await fetch(
      endpoint,
      {
        ...options,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
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
