import { Fragment, Suspense, useEffect } from "react";
import SearchForm from "../components/SearchForm";
import FestivalList from "../components/FestivalList";
import { Await } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadFestivals } from "../store/cart-actions";

const Festivals = () => {
  const festivals = useSelector((state) => state.cart.festivals);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadFestivals());
  }, [dispatch]);
  return (
    <Fragment>
      <SearchForm />
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={festivals}>
          {(loadedFestivals) => <FestivalList festivals={loadedFestivals} />}
        </Await>
      </Suspense>
    </Fragment>
  );
};

export default Festivals;
