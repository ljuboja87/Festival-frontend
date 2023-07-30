import { useRouteLoaderData } from "react-router-dom";
import FestivalForm from "../components/FestivalForm";

const NewFestival = () => {
  const { venues } = useRouteLoaderData('venues-list');
  console.log(venues);
  return <FestivalForm method="POST" venues={venues}/>;
};

export default NewFestival;
