import { jwtDecode } from "jwt-decode";
export const verifyToken = (token: string) => {
  return jwtDecode(token);
};

export const formatMonthYear = (dateString: string) => {
  const date = new Date(dateString);

  const newDate = date.toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });

  return newDate;
};
