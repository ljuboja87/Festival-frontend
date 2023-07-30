import { useNavigate, useRouteLoaderData, useSubmit } from "react-router-dom";
import classes from './FestivalItem.module.css';

const FestivalItem = ({ festival }) => {
  console.log(festival.name);
  const navigate = useNavigate();
  const submit = useSubmit();
  const tokenRole = useRouteLoaderData("root");
  const ADMIN = tokenRole[1] === "ROLE_ADMIN";

  const back = () => {
    navigate("..");
  };

  const startDeleteHandler = () => {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  };

  return (
    <>
      <div className={classes.text}>
        <p>{festival.description}</p>
        <div>
          <button onClick={back}>back</button>
          {ADMIN && <button onClick={startDeleteHandler}>Delete</button>}
        </div>
      </div>
    </>
  );
};

export default FestivalItem;
