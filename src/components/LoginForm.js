import { Form, useActionData, useNavigation } from "react-router-dom";
import classes from "./LoginForm.module.css";
import { useState } from "react";

const LoginForm = () => {
  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  console.log(isSubmitting)

  const[checked, setChecked] = useState(false);

  const toggle = () => {
    setChecked(!checked);
  }

  return (
    <Form method="post" className={classes.form}>
      <h1>Login</h1>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      {data && data.message && <p>{data.message}</p>}
      <p>
        <label htmlFor="userName">User name</label>
        <input type="text" name="userName" required autoFocus></input>
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type={checked ? 'text' : 'password'} name="password" required></input>
      </p>
      <p>
      <input type="checkbox" onClick={toggle}></input>
      </p>
      <div>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Login"}
        </button>
      </div>
    </Form>
  );
};

export default LoginForm;
