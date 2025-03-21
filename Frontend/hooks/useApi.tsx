import { useState, useCallback } from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type ApiResponse<T> = T | null;

interface ApiHook<T> {
  data: ApiResponse<T>;
  loading: boolean;
  error: string | null;
  request: (endpoint: string, method?: HttpMethod, body?: any, headers?: HeadersInit) => Promise<ApiResponse<T>>;
  setData: (newData: ApiResponse<T>) => void;
}

const useApi = <T, >(baseUrl: string): ApiHook<T> => {
  const [data, setData] = useState<ApiResponse<T>>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async (endpoint: string, method: HttpMethod = "GET", body?: any, headers: HeadersInit = {}) => {
      setLoading(true);
      setError(null);

    try {
      const url = new URL(`${baseUrl}${endpoint}`);
      const config: RequestInit = {
        method,
        headers: {
        "Content-Type": "application/json",
        ...headers,
        },
        body: method !== "GET" && body ? JSON.stringify(body) : undefined,
      };

      if (method === "GET" && body) {
        Object.keys(body).forEach(key => url.searchParams.append(key, body[key]));
      }

      console.log(url);

        const response = await fetch(`${baseUrl}${endpoint}`, config);

        if (!response.ok) {
          let errorMessage = `Erreur ${response.status}`;
          if (response.headers.get("Content-Type")?.includes("application/json")) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          }
          console.log(errorMessage);
          throw new Error(errorMessage);
        }

        const responseData: T = await response.json();
        setData(responseData);
        return responseData;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Une erreur inconnue est survenue";
        setError(errorMessage);
        alert(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [baseUrl]
  );

  return { data, loading, error, request, setData };
}; // <-- Ici, l'accolade fermante en trop a été supprimée

export default useApi;