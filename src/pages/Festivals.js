import { Fragment } from "react";
import SearchForm from "../components/SearchForm";
import FestivalList from "../components/FestivalList";

const Festivals = () => {
  return (
    <Fragment>
      <SearchForm />
      <FestivalList />
    </Fragment>
  );
};

export default Festivals;
