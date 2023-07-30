import React from "react";
import FestivalsAxios from "../Apis/FestivalsAxios";
import { json } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const FestivalContext = React.createContext({
  loader: (name, venueId, pageNo) => {},
  festivals: [],
  pageNo: 0,
  totalPages: "",
});

export const FestivalContextProvider = (props) => {
  const [festivals, setFestivals] = useState();
  const [totalPages, setTotalPages] = useState();
  const [pageNo, setpageNo] = useState();

  useEffect(() => {
    loadFestivals(0);
  }, []);

  const loadFestivals = async (pageNo, name, venueId) => {
    const config = {
      params: {
        pageNo: pageNo,
      },
    };

    if (name !== "") {
      config.params.name = name;
    }

    if (venueId !== -1) {
      config.params.venueId = venueId;
    }

    return await FestivalsAxios.get("festivals", config)
      .then((res) => {
        console.log(res);
        setFestivals(res.data);
        setTotalPages(res.headers["total-pages"]);
        setpageNo(res.config.params.pageNo);
        // console.log(festivals, pageNo, totalPages)
        // return [festivals, pageNo, totalPages];
      })
      .catch((error) => {
        console.log(error);
        throw json({ message: "Could not fetch festivals!" }, { status: 500 });
      });
  };

  return (
    <FestivalContext.Provider
      value={{
        loader: loadFestivals,
        festivals: festivals,
        pageNo: pageNo,
        totalPages: totalPages,
      }}
    >
      {props.children}
    </FestivalContext.Provider>
  );
};

export default FestivalContext;
