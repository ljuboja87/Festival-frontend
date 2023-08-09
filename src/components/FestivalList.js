import { useNavigate, useRouteLoaderData } from "react-router-dom";
import classes from "../components/FestivalList.module.css";
import { Fragment, useState } from "react";
import { useEffect } from "react";
import Festival from "./Festival";
import { useDispatch, useSelector } from "react-redux";
import { loadFestivals } from "../store/cart-actions";

const FestivalList = () => {
  const dispatch = useDispatch();
  const festivals = useSelector((state) => state.cart.festivals);
  const totalPages = useSelector((state) => state.cart.totalPages);
  const [pageNo, setPageNo] = useState(
    useSelector((state) => state.cart.pageNo)
  );
  const tokenRole = useRouteLoaderData("root");
  const token = tokenRole[0];
  const USER = tokenRole[1] === "ROLE_USER";
  const ADMIN = tokenRole[1] === "ROLE_ADMIN";

  useEffect(() => {
    dispatch(loadFestivals(pageNo));
  }, [pageNo, dispatch]);

  const navigate = useNavigate();
  console.log(festivals);

  const add = () => {
    navigate("/festivals/new");
  };

  const decrement = () => {
    setPageNo(pageNo - 1);
  };

  const increment = () => {
    setPageNo(pageNo + 1);
  };

  return (
    <Fragment>
      <div>
        {ADMIN && (
          <div className={classes.addButton}>
            <button onClick={add}>Add festival</button>
          </div>
        )}
        <div className={classes.festival}>
          <button disabled={pageNo === 0} onClick={decrement}>
            previous
          </button>
          <button disabled={pageNo === totalPages - 1} onClick={increment}>
            next
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>venue</th>
            <th>start</th>
            <th>end</th>
            <th>price</th>
            {ADMIN && <th>available tickets</th>}
            {ADMIN && <th>total income</th>}
            {token && USER && <th>NO.tickets</th>}
            <th></th>
            {ADMIN && <th></th>}
          </tr>
        </thead>
        <tbody>
          {festivals.map((festival) => (
            <Festival
              key={festival.id}
              festival={festival}
            />
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default FestivalList;
