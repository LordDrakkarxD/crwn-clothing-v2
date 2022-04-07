import { combineReducers } from "redux";

import { userReducer } from "./user/user";
import { categoriesReducer } from "./categories/category";
import { cartReducer } from "./cart/cart";

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});
