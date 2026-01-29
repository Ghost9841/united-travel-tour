// lib/apiFetch.ts

const BASE_URL = process.env.NEXT_PUBLIC_MOCK_API_URL;

type ApiFetchOptions<TBody> = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: TBody;
  headers?: HeadersInit;
} & Omit<RequestInit, "method" | "body" | "headers">;

export async function apiFetch<TResponse, TBody = undefined>(
  endpoint: string,
  {
    method = "GET",
    body,
    headers = {},
    ...options
  }: ApiFetchOptions<TBody> = {}
): Promise<TResponse> {
  if (!BASE_URL) {
    throw new Error("BASE_URL is not defined");
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
    ...options,
  });

  if (!res.ok) {
    let message = "API Error";
    try {
      const error = await res.json();
      message = error?.message ?? message;
    } catch {}
    throw new Error(message);
  }

  // Handle 204 No Content
  if (res.status === 204) {
    return undefined as TResponse;
  }

  return res.json() as Promise<TResponse>;
}