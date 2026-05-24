const defaultBaseUrl = import.meta.env.DEV ? "http://localhost:4000" : ""

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || defaultBaseUrl

export function apiUrl(path: string) {
  return `${apiBaseUrl}${path}`
}