import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    festivals: [],
    festivalsCart: [],
    totalPages: 0,
    pageNo: 0,
    totalPrice: 0,
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    replaceData(state, action) {
      state.festivals = action.payload.festivals;
      state.totalPages = action.payload.totalPages;
      state.pageNo = action.payload.pageNo;
    },
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.festivals = action.payload.festivals;
    },
    addFestivalToCart(state, action) {
      const newFestivalCart = action.payload.festival;
      const existingFestivalCart = state.festivalsCart.find(
        (festival) => festival.id === newFestivalCart.id
      );
      state.totalPrice =
        state.totalPrice +
        action.payload.festival.price * action.payload.noTickets;
      state.totalQuantity =
        state.totalQuantity + parseInt(action.payload.noTickets);
      state.changed = true;
      if (!existingFestivalCart) {
        state.festivalsCart.push({
          id: newFestivalCart.id,
          name: newFestivalCart.name,
          startDate: newFestivalCart.startDate,
          endDate: newFestivalCart.endDate,
          price: newFestivalCart.price,
          noTickets: action.payload.noTickets,
          city: newFestivalCart.city,
          country: newFestivalCart.country,
        });
      } else {
        existingFestivalCart.noTickets =
          parseInt(existingFestivalCart.noTickets) +
          parseInt(action.payload.noTickets);
      }
    },
    removeFestivalFromCart(state, action) {
      const id = action.payload.id;
      const existingFestivalCart = state.festivalsCart.find(
        (festival) => festival.id === id
      );
      state.totalQuantity = state.totalQuantity - 1;
      state.changed = true;
      state.totalPrice = state.totalPrice - existingFestivalCart.price;
      if (existingFestivalCart.noTickets === 1) {
        state.festivalsCart = state.festivalsCart.filter(
          (festival) => festival.id !== id
        );
      } if (existingFestivalCart.length === 1 && existingFestivalCart.noTickets === 0) {
        return;
      } else {
        existingFestivalCart.noTickets = existingFestivalCart.noTickets - 1;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
