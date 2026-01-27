const BASE_URL = "http://localhost:5000/api";
export default async function apiRequest(endpoint, options = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.header,
  };
  // Now go to the api end
  return fetch(`${BASE_URL}${endpoint}`, { ...options,headers });
}
