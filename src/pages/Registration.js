import { redirect } from "react-router-dom";
import RegistrationForm from "../components/RegistrationForm";
import FestivalsAxios from "../Apis/FestivalsAxios";

const Registration = () => {
  return <RegistrationForm />;
};

export default Registration;

export const acion = async ({ request }) => {
  const data = await request.formData();
  console.log(data);

  const cred = {
    name: data.get("firstName"),
    surname: data.get("lastName"),
    userName: data.get("userName"),
    eMail: data.get("email"),
    password: data.get("password"),
    repeatedPassword: data.get("repeatedPassword"),
  };

  await FestivalsAxios.post("/users", cred)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });

  return redirect("/login");
};
