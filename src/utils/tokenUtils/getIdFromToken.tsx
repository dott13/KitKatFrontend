import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string;
}

export const getIdFromToken = (token: string): number | null => {
  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return parseInt(decoded.sub, 10)|| null;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null; // Return null on failure
  }
};
