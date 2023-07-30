import { Link, useRouteLoaderData } from "react-router-dom";
import classes from "./FestivalList.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";

const Festival = ({festival}) => {
  const tokenRole = useRouteLoaderData("root");
  const dispatch = useDispatch();
  const token = tokenRole[0];
  const USER = tokenRole[1] === "ROLE_USER";
  const ADMIN = tokenRole[1] === "ROLE_ADMIN";
  console.log(USER);
  console.log(ADMIN);
  const [noTickets, setNoTickets] = useState();
  const {
    id,
    name,
    startDate,
    endDate,
    price,
    numberOfAvailableTickets,
    venue:  {
      city,
    country,
    }
} = festival;
  console.log(festival);

   const addToCart = () => {
  //   FestivalsAxios.post(
  //     `festivals/${id}/make_reservation?noTickets=${noTickets}`
  //   )
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

    dispatch(
      cartActions.addFestivalToCart({
        festival,
        noTickets,
      })
    );
  };

  return (
    <tr key={id} className={classes.row}>
      <td>
        <Link to={`${id}`}>{name}</Link>
      </td>
      <td>
        {city} {country}
      </td>
      <td>{startDate}</td>
      <td>{endDate}</td>
      <td>{price}</td>
      {ADMIN &&<td>
        {numberOfAvailableTickets !== 0
          ? numberOfAvailableTickets
          : "soled out"}
      </td>}
      {token && USER && (
        <td>
          <input
            type="number"
            defaultValue={0}
            step={1}
            min={1}
            max={10}
            onChange={(e) => setNoTickets(e.target.value)}
          ></input>
        </td>
      )}
      {ADMIN && (
        <td>
          <Link to={`${id}/edit`}>
            <button>Edit</button>
          </Link>
        </td>
      )}

      {token && USER && 
        <td>
          {numberOfAvailableTickets ? 
          <button onClick={addToCart}>Add to cart</button>: 'not available'}
        </td>
       }
    </tr>
  );
};

export default Festival;
