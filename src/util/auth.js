import { redirect } from "react-router-dom";

export const getTokenDuration = () => {
  const storedExspirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExspirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();

  return duration;
};

export const getAuthToken = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return 0;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return [token, role];
};

export const tokenLoader = () => {
  return getAuthToken();
};

export const checkAuthLoader = () => {

    const tokenRole = getAuthToken();

    const token = tokenRole[0];

    if(!token) {
      return  redirect('login')
    }

    return 0;
}
