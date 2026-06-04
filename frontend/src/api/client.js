const API_BASE = import.meta.env.VITE_API_BASE || "";

export async function apiFetch(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const hasBody = options.body !== undefined;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    body: hasBody ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    let errorMessage = `Request failed (${response.status})`;
    try {
      const errorPayload = await response.json();
      errorMessage = errorPayload.error || errorMessage;
    } catch (error) {
      // Ignore JSON parsing errors.
    }
    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
