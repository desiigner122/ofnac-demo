"use client";

export type Role = "agent" | "assujetti" | null;

const STORAGE_KEY = "ofnac_session";

export function login(role: "agent" | "assujetti", name: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ role, name, loggedAt: Date.now() }));
}

export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function getSession(): { role: Role; name: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
