import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import { selectCurrentUser } from "./store/user/user.selector";

import Spinner from "./components/spinner/spinner";

import { checkUserSession } from "./store/user/user.action";

const Authentication = lazy(() =>
  import("./routes/authentication/authentication")
);
const Shop = lazy(() => import("./routes/shop/shop"));
const Checkout = lazy(() => import("./routes/checkout/checkout"));
const Home = lazy(() => import("./routes/home/home"));
const Navigation = lazy(() => import("./routes/navigation/navigation"));

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  const redirectHandler = currentUser ? (
    <Navigate to="/" />
  ) : (
    <Authentication />
  );

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={redirectHandler} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
