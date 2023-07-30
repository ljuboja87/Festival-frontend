import { useSelector } from 'react-redux';
import classes from './CartButton.module.css'
import { useEffect, useState } from 'react';
import CartIcon from './CartIcon';

const CartButton = (props) => {
     const totalQuantity = useSelector((state) => state.cart.totalQuantity);
     const festivals = useSelector((state) => state.cart.festivalsCart)
     const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
     const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;
  
    useEffect(() => {
      if (festivals.length === 0) {
        return;
      }
      setBtnIsHighlighted(true);
  
      const timer = setTimeout(() => {
        setBtnIsHighlighted(false);
      }, 300);
  
      return () => {
        clearTimeout(timer);
      };
    }, [festivals]);
  
    return (
      <button className={btnClasses} onClick={props.onShowCart}>
        <span className={classes.icon}>
        <CartIcon />
      </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{totalQuantity}</span>
      </button>
    );
  };
  
  export default CartButton;