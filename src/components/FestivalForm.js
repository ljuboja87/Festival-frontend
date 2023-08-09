import {
  Form,
  json,
  redirect,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import classes from "./FestivalForm.module.css";
import FestivalsAxios from "../Apis/FestivalsAxios";
import { useState } from "react";

const FestivalForm = ({ method, festival, venues }) => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const cancelPost = () => {
    navigate("..");
  };
  const cancelPatch = () => {
    navigate("../..");
  };

  var fest = {
    name: 0,
    startDate: "",
    endDate: "",
    price: 0.0,
    availableTickets: 0,
    venueId: null,
  };

  const [newFestival, setNewFestival] = useState(fest);

  const onInputChange = (e) => {
    const { name, value } = e.target;

    setNewFestival((festival) => {
      var new_festival = { ...festival };
      new_festival[name] = value;
      return new_festival;
    });
  };

  const check = () => {
    return (
      newFestival.name !== "" &&
      newFestival.startDate !== "" &&
      newFestival.endDate !== "" &&
      newFestival.price !== "" &&
      newFestival.price > 0 &&
      newFestival.availableTickets !== "" &&
      newFestival.availableTickets > 0 &&
      newFestival.venueId > 0
    );
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
          onChange={(e) => onInputChange(e)}
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
          onChange={(e) => onInputChange(e)}
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
          onChange={(e) => onInputChange(e)}
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
          step="0.01"
          placeholder="price"
          onChange={(e) => onInputChange(e)}
          required
          defaultValue={festival ? festival.price : ""}
        />
      </p>
      <p>
        <label htmlFor="availableTickets">No. tickets</label>
        <input
          id="availableTickets"
          type="number"
          name="availableTickets"
          placeholder="number of available tickets"
          min={1}
          onChange={(e) => onInputChange(e)}
          required
          defaultValue={festival ? festival.availableTickets : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="description"
          rows={2}
          onChange={(e) => onInputChange(e)}
          required
          defaultValue={festival ? festival.description : ""}
        />
      </p>
      <p>
        <label htmlFor="venue">venue</label>
        <select
          id="venue"
          name="venueId"
          onChange={(e) => onInputChange(e)}
          required
          autoFocus={method === "PUT" ? true : false}
          defaultValue={festival ? festival.venue.id : ""}
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
        <button
          type="button"
          onClick={method === "POST" ? cancelPost : cancelPatch}
        >
          Cancel
        </button>
        <button
          disabled={method === "POST" ? !check() : ""}
          aria-disabled={false}
        >
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
    numberOfAvailableTickets: data.get("availableTickets"),
    description: data.get("description"),
    venue: {
      id: data.get("venueId"),
    },
  };

  const start = new Date(dataFestival.startDate);
  const end = new Date(dataFestival.endDate);

  if (start > end) {
    alert("End of date must be after start of date.");
    return null;
  }

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

  if (method === "POST") {
    return redirect("..");
  } else {
    return redirect("../..");
  }
};
