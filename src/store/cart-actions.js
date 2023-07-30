import { json } from "react-router-dom";
import FestivalsAxios from "../Apis/FestivalsAxios";
import { cartActions } from "./cart-slice";

export const loadFestivals = (pageNo, name, venueId) => {
  return async (dispatch) => {
    const load = async () => {
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
          return res;
        })
        .catch((error) => {
          console.log(error);
          throw json(
            { message: "Could not fetch festivals!" },
            { status: 500 }
          );
        });
    };

    try {
      const res = await load();
      dispatch(
        cartActions.replaceData({
          festivals: res.data || [],
          totalPages: res.headers["total-pages"],
          pageNo: res.config.params.pageNo,
        })
      );
    } catch (error) {
      // NESTO OVDE
    }
  };
};

export const sendData = async (id, noTickets) => {
  FestivalsAxios.post(`festivals/${id}/make_reservation?noTickets=${noTickets}`)
    .then((res) => {
      console.log(res);
      loadFestivals();
    })
    .catch((error) => {
      console.log(error);
    });
};
