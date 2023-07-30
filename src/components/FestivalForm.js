import {
  Form,
  json,
  redirect,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import classes from "./FestivalForm.module.css";
import FestivalsAxios from "../Apis/FestivalsAxios";

const FestivalForm = ({ method, festival, venues }) => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  console.log(isSubmitting)
  console.log(venues);

  const cancelPost = () => {
    navigate("..");
  };
  const cancelPatch = () => {
    navigate("../..");
  };

  return (
    <Form method={method} className={classes.form}>
      <p>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="name"
          autoFocus
          required
          defaultValue={festival ? festival.name : ""}
        />
      </p>
      <p>
        <label htmlFor="startDate">From</label>
        <input
          id="start"
          type="date"
          name="startDate"
          placeholder="from"
          required
          defaultValue={festival ? festival.startDate : ""}
        />
      </p>
      <p>
        <label htmlFor="end">To</label>
        <input
          id="endDate"
          type="date"
          name="endDate"
          placeholder="to"
          required
          defaultValue={festival ? festival.endDate : ""}
        />
      </p>
      <p>
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          name="price"
          placeholder="price"
          required
          defaultValue={festival ? festival.price : ""}
        />
      </p>
      <p>
        <label htmlFor="numberOfAvailableTickets">No. tickets</label>
        <input
          id="numberOfAvailableTickets"
          type="number"
          name="numberOfAvailableTickets"
          placeholder="number of available tickets"
          min={1}
          required
          defaultValue={festival ? festival.numberOfAvailableTickets : ""}
        />
      </p>
      <p>
        <label htmlFor="venue">venue</label>
        <select
          id="venue"
          name="venueId"
          required
          autoFocus={method === 'PUT' ? true : false}
          defaultValue={festival ? festival.venue.id : ''}
        >
          <option value="">--choose venue--</option>
          {venues.map((venue) => {
            return (
              <option value={venue.id} key={venue.id}>
                {venue.city}, {venue.country}
              </option>
            );
          })}
        </select>
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={method === 'POST' ? cancelPost : cancelPatch}>
          Cancel
        </button>
        <button aria-disabled={false}>
          {isSubmitting ? "Submitting" : "Save"}
        </button>
      </div>
    </Form>
  );
};

export default FestivalForm;

export const action = async ({ params, request }) => {
  const method = request.method;
  const data = await request.formData();
  console.log(data);

  const dataFestival = {
    id: params.festivalId,
    name: data.get("name"),
    startDate: data.get("startDate"),
    endDate: data.get("endDate"),
    price: data.get("price"),
    numberOfAvailableTickets: data.get("numberOfAvailableTickets"),
    venue: {
      id: data.get("venueId"),
    },
  };

  let url = "http://localhost:8080/festivals/";

  if (method === "PUT") {
    const festivalId = params.festivalId;
    console.log(festivalId);
    url = "http://localhost:8080/festivals/" + festivalId;
  }
  

  await FestivalsAxios({
    url: url,
    data: dataFestival,
    method: method,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
      throw json({ message: "Could not save event." }, { status: 500 });
    });

  return redirect("../..");
};
