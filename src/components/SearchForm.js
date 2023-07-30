import { Form, useRouteLoaderData } from "react-router-dom";
import classes from "./SearchForm.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loadFestivals } from "../store/cart-actions";

const SearchForm = () => {
  const { venues } = useRouteLoaderData("venues-list");
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [venuId, setVenueId] = useState("");
  console.log(venuId);

  const submitHandler = () => {
    dispatch(loadFestivals("", name, venuId));
  };

  return (
    <Form className={classes.form} onSubmit={submitHandler}>
      <p>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        ></input>
      </p>
      <p>
        <label htmlFor="venuId">venue</label>
        <select name="venuId" onChange={(e) => setVenueId(e.target.value)}>
          <option value="">--choose venue--</option>
          {venues.map((venue) => {
            return (
              <option key={venue.id} value={venue.id}>
                {venue.city}, {venue.country}
              </option>
            );
          })}
        </select>
      </p>
      <div className={classes.actions}>
        <button>Search</button>
      </div>
    </Form>
  );
};

export default SearchForm;
