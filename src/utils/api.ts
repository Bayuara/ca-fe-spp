/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthorizationError from "@/shared/authorizationError";

export async function fetchData<T>(
  url: string,
  method: string,
  body?: unknown
): Promise<{
  data: T;
  message: string;
  page: { totalItems: number };
  status: any;
  totalAmount?: any;
}> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, {
    method: method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken") ?? ""}`,
    },
  });

  if (!response.ok) {
    if ([401, 403].includes(response.status)) {
      throw new AuthorizationError();
    }
    const { message } = await response.json();

    throw new Error(message);
  }

  return response.json();
}

export async function fetchBlob(
  url: string,
  method: string,
  body?: unknown
): Promise<Blob> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, {
    method: method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken") ?? ""}`,
    },
  });

  if (!response.ok) {
    const { message } = await response.json();

    throw new Error(message);
  }

  // console.log("response fetchBlob: ", response);

  return response.blob();
}

export async function fetchBlobImg(
  url: string,
  method: string,
  body?: unknown
): Promise<Blob> {
  const response = await fetch(`${url}`, {
    method: method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken") ?? ""}`,
    },
  });
  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }

  // console.log("response fetchBlob: ", response);

  return response.blob();
}

export function generateSearchParams(payload: object = {}) {
  const keys = Object.keys(payload);
  const arr = keys
    .filter((key) => payload[key as keyof object] !== undefined)
    .map((key) => {
      const k = key as keyof object;
      if (!Array.isArray(payload[k]))
        return `${key}=${payload[key as keyof object]}`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const arr: any[] = payload[k];

      return arr.map((a) => `${k}=${a}`).join("&");
    });

  return arr.join("&");
}
