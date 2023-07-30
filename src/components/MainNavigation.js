import { Form, NavLink, useRouteLoaderData } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import Cart from "./Cart";
import { Fragment, useState } from "react";
import MainHeader from "./MainHeader";

const MainNavigation = () => {
  const tokenRole = useRouteLoaderData("root");
  const [cartIsShown, setCartIsShown] = useState();

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  const token = tokenRole[0];
  console.log(token);

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/festivals"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Festivals
            </NavLink>
          </li>
          <li>
            <nav>
              <ul>
                <li>
                  <Fragment>
                    <MainHeader onShowCart={showCartHandler} />
                    {cartIsShown && <Cart onClose={hideCartHandler} />}
                  </Fragment>
                </li>
              </ul>
            </nav>
          </li>
          {!token && (
            <li>
              <NavLink
                to="login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <Form method="post">
                  <button>Login</button>
                </Form>
              </NavLink>
            </li>
          )}
          {!token && (
            <li>
              <NavLink
                to="registration"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <Form method="post">
                  <button>Sign up</button>
                </Form>
              </NavLink>
            </li>
          )}
          {token && (
            <li>
              <Form action="logout" method="post">
                <button>Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
