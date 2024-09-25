import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  email: string;
}

export const getMailFromToken = (token: string): string | null => {
  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.email || null; // Return email if exists
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null; // Return null on failure
  }
};
