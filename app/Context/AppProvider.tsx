export function myAppHook() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

  async function login(email: string, password: string) {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // if backend uses cookies/sessions
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || "Login failed");
    }
    return res.json(); // should include user info and role
  }

  async function register(name: string, email: string, password: string, password_confirmation: string) {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, password_confirmation }),
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || "Registration failed");
    }
    return res.json();
  }

  return { login, register };
}