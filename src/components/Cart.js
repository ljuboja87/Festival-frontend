import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import Modal from "./Modal";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const festivals = useSelector((state) => state.cart.festivalsCart);
  const totalPrice = useSelector(
    (state) => state.cart.totalPrice
  );
  const hasItems = festivals.length > 0;

  const cartFestivals = (
    <ul className={classes["cart-items"]}>
      {festivals.map((festival) => (
        <CartItem festival={festival} key={festival.id} />
      ))}
    </ul>
  );

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
        {hasItems && <button className={classes.button}>Buy tickets</button>}
      </div>
    </Modal>
  );
};

export default Cart;
