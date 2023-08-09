import { useRouteLoaderData } from "react-router-dom";
import FestivalForm from "../components/FestivalForm";

const EditFestival = () => {
  const {festival} = useRouteLoaderData("festival-detail");
  const {venues} = useRouteLoaderData("venues-list");

  return <FestivalForm method="PUT" venues={venues} festival={festival} />;
};

export default EditFestival;
