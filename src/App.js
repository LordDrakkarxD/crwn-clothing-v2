import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import { selectCurrentUser } from "./store/user/user.selector";

import Home from "./routes/home/home.jsx";
import Navigation from "./routes/navigation/navigation.jsx";
import Authentication from "./routes/authentication/authentication.jsx";
import Shop from "./routes/shop/shop.jsx";
import Checkout from "./routes/checkout/checkout.jsx";
import { checkUserSession } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  const redirectHandler = currentUser ? (
    <Navigate to="/" />
  ) : (
    <Authentication />
  );

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={redirectHandler} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
