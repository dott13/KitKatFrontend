import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: string;
}

export const getRoleFromToken = (token: string): string | null => {
  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.role || null; // Return role if exists
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null; // Return null on failure
  }
};
