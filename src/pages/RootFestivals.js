import { Outlet, defer, json } from "react-router-dom";
import FestivalsAxios from "../Apis/FestivalsAxios";

const RootFestivals = () => {
  return (
    <>
      <p style={{textAlign: 'center', fontSize: '50px', color: 'green'}}>F E S T I V A L S</p>
      <Outlet />
    </>
  );
};

export default RootFestivals;

const loaderVenues =async () => {
  return await FestivalsAxios.get("venues")
    .then((res) => {
      console.log(res.data)
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      throw json({ message: "Could fetch festivals!" }, { status: 500 });
    });
};

export const loader = async() => {
  return defer({
    venues: await loaderVenues(),
  });
};
