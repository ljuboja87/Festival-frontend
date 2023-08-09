import { useDispatch } from "react-redux";
import classes from "./CartItem.module.css";
import { cartActions } from "../store/cart-slice";

const CartItem = ({ festival }) => {
  const dispatch = useDispatch();

  const onRemove = () => {
    dispatch(cartActions.removeFestivalFromCart({ id: festival.id }));
  };
  const onAdd = () => {
    dispatch(
      cartActions.addFestivalToCart({
        festival,
        noTickets: 1,
      })
    );
  };

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{festival.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{festival.price}</span>
          <span className={classes.amount}>x {festival.noTickets}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={onRemove}>−</button>
        <button onClick={onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
