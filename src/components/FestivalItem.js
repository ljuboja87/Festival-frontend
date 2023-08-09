import { useNavigate, useRouteLoaderData, useSubmit } from "react-router-dom";
import classes from "./FestivalItem.module.css";
import { useDispatch } from "react-redux";
import { loadFestivals } from "../store/cart-actions";

const FestivalItem = ({ festival }) => {
  const navigate = useNavigate();
  const submit = useSubmit();
  const dispatch = useDispatch();
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
    dispatch(loadFestivals(0));
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
