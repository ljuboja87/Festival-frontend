import CartButton from "./CartButton";

const MainHeader = (props) => {
    return (
        <nav>
          <ul>
            <li>
              <CartButton onShowCart={props.onShowCart}/>
            </li>
          </ul>
        </nav>
    );
  };
  
  export default MainHeader;