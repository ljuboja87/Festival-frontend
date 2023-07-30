import { redirect } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import FestivalAxios from "../Apis/FestivalsAxios";
import jwt_decode from "jwt-decode";

const Authentication = () => {
  return <LoginForm />;
};

export default Authentication;

export const action = async ({ request }) => {
  
  const data = await request.formData();

  const cred = {
    username: data.get("userName"),
    password: data.get("password"),
  };

  const response = await FestivalAxios.post("/users/auth", cred)
    .then((res) => {
      const jwt_decoded = jwt_decode(res.data);
      window.localStorage.setItem("token", res.data);
      window.localStorage.setItem("role", jwt_decoded.role.authority);
      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 1);
      localStorage.setItem("expiration", expiration.toISOString());
      //window.localStorage.setItem("expiration", jwt_decoded.created);
      window.localStorage.setItem("username", jwt_decoded.sub);
      console.log(jwt_decoded.sub);
    })
    .catch((error) => {
      console.log(error);
      console.log(error.response.status);
      console.log(error.response.data);
      return error.response.data;
    });

  if (response) {
    return response;
  }

  return redirect("/festivals");
};
