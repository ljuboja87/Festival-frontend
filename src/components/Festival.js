import { Link, useRouteLoaderData } from "react-router-dom";
import classes from "./FestivalList.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";
import FestivalsAxios from "../Apis/FestivalsAxios";
// import FestivalsAxios from "../Apis/FestivalsAxios";

const Festival = ({ festival }) => {
  const tokenRole = useRouteLoaderData("root");
  const dispatch = useDispatch();
  const [totalIncome, setTotalIncome] = useState();
  const token = tokenRole[0];
  const USER = tokenRole[1] === "ROLE_USER";
  const ADMIN = tokenRole[1] === "ROLE_ADMIN";
  const [noTickets, setNoTickets] = useState();
  const {
    id,
    name,
    startDate,
    endDate,
    price,
    numberOfAvailableTickets,
    venue: { city, country },
  } = festival;

  const addToCart = () => {
    const availableTickets = numberOfAvailableTickets - noTickets;

    if (noTickets > 0 && availableTickets < 0) {
      return alert(
        `Number of available tickets is ${numberOfAvailableTickets}!`
      );
    } else if (noTickets > 0) {
      dispatch(
        cartActions.addFestivalToCart({
          festival,
          noTickets,
        })
      );
    } else {
      alert("Number of tickets is 0 !");
    }
    setNoTickets(0);
  };

  if (token && ADMIN) {
    FestivalsAxios.get(`festivals/${id}/totalIncome`)
      .then((res) => {
        console.log(res.data);
        setTotalIncome(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <tr key={id} className={classes.row}>
      <td>
        <Link to={`${id}`}>{name}</Link>
      </td>
      <td>
        {city}, {country}
      </td>
      <td>{startDate}</td>
      <td>{endDate}</td>
      <td>{price.toFixed(2)} dinara</td>
      {token && ADMIN && (
        <td>
          {numberOfAvailableTickets !== 0
            ? numberOfAvailableTickets
            : "soled out"}
        </td>
      )}
      {token && ADMIN && <td>{totalIncome} dinara.</td>}
      {token && USER && (
        <td>
          {numberOfAvailableTickets > 0 ? (
            <input
              type="number"
              defaultValue={0}
              step={1}
              min={1}
              max={10}
              value={noTickets}
              onChange={(e) => setNoTickets(e.target.value)}
            ></input>
          ) : (
            "soled out"
          )}
        </td>
      )}
      {token && ADMIN && (
        <td>
          <Link to={`${id}/edit`}>
            <button>Edit</button>
          </Link>
        </td>
      )}

      {token && USER && (
        <td>
          {numberOfAvailableTickets > 0 ? (
            <button onClick={addToCart}>Add to cart</button>
          ) : (
            "not available"
          )}
        </td>
      )}
    </tr>
  );
};

export default Festival;
