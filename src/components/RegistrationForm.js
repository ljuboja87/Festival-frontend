import { useState } from "react";
import { Form, useNavigation } from "react-router-dom";
import classes from "./RegistrationForm.module.css";

const RegistrationForm = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <Form method="post" className={classes.form}>
      <h1>Registration</h1>
      <p>
        <label htmlFor="firstName">First name</label>
        <input type="text" name="firstName" required autoFocus></input>
      </p>
      <p>
        <label htmlFor="lastName">Last name</label>
        <input type="text" name="lastName" required></input>
      </p>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" required></input>
      </p>
      <p>
        <label htmlFor="userName">User name</label>
        <input type="text" name="userName" required></input>
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input
          type={passwordShown ? "text" : "password"}
          name="password"
          required
        ></input>
        <label htmlFor="repeatedPassword">Repeat password</label>
        <input
          type={passwordShown ? "text" : "password"}
          name="repeatedPassword"
          required
        ></input>
      </p>
      <p>
        <input type="checkbox" onClick={togglePassword}></input>
      </p>
      <div>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Sign up"}
        </button>
      </div>
    </Form>
  );
};

export default RegistrationForm;