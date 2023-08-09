import { Await, defer, json, redirect, useRouteLoaderData } from "react-router-dom";
import FestivalsAxios from "../Apis/FestivalsAxios";
import FestivalItem from "../components/FestivalItem";
import { Suspense } from "react";

const FestivalDetail = () => {
  const {festival} = useRouteLoaderData("festival-detail");
  console.log(festival);
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={festival}>
        {(loadedFestival) => <FestivalItem festival={loadedFestival} />}
      </Await>
    </Suspense>
  );
};

export default FestivalDetail;

const loadFestival = async(id) => {
  return await FestivalsAxios.get("festivals/" + id)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      throw json(
        { message: "Could not fetch details for selected festival!" },
        { status: 500 }
      );
    });
};

export const loader = async ({ params }) => {
  return defer({
    festival: await loadFestival(params.festivalId),
  });
};

export const action = async({request, params}) => {

  const id = params.festivalId;
  const method = request.method;
  const url = "http://localhost:8080/festivals/" + id;

  await FestivalsAxios({
    url: url,
    method: method,
  })
    .then((res) => {
      console.log(res.headers);
    })
    .catch((error) => {
      console.log(error);
      throw json({ message: "The festival is not deleted" }, { status: 500 });
    });
  return redirect("/festivals");
}