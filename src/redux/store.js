import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./reducers/bookSlicer";
// import { loadState, saveState } from "./localStorage";

const reducer = {
  bookReducer,
};

// const preloadedState = loadState();

export const store = configureStore({
  reducer,
//  preloadedState,
});

// store.subscribe(() => {
//   saveState({
//     bookReducer: store.getState().bookReducer,
//   });
// });
