import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import Modal from "./Modal";
import classes from "./Cart.module.css";
import FestivalsAxios from "../Apis/FestivalsAxios";
import { cartActions } from "../store/cart-slice";
//import { useEffect } from "react";

const Cart = (props) => {
  const festivals = useSelector((state) => state.cart.festivalsCart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const hasItems = festivals.length > 0;

  const cartFestivals = (
    <ul className={classes["cart-items"]}>
      {festivals.map((festival) => (
        <CartItem festival={festival} key={festival.id} />
      ))}
    </ul>
  );

  const onBuyHandler = () => {
    festivals.map((festival) => {
      const availableTickets = festival.availableTickets - festival.noTickets;

      if (availableTickets < 0) {
        return alert(
          `Number of available tickets is ${festival.availableTickets}!`
        );
      }

      FestivalsAxios.post(
        `festivals/${festival.id}/make_reservation?noTickets=${
          festival.noTickets
        }&userName=${window.localStorage.getItem("username")}`
      )
        .then((res) => {
          return dispatch(cartActions.resetCart());
        })
        .catch((error) => {
          console.log(error);
        });
      return window.location.reload();
    });
  };

  return (
    <Modal onClose={props.onClose}>
      {cartFestivals}
      <div className={classes.total}>
        <span>Total Amount:</span>
        {totalPrice ? <span>{totalPrice} RSD</span> : "0"}
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={onBuyHandler}>
            Buy tickets
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
