import { redirect } from "react-router-dom";

export const action = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("expiration");
  localStorage.removeItem("username");

  
  return redirect("..");
};
