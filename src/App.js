import { Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "./responsive.css";
import HomeScreen from "./screens/HomeScreen";
import SingleProduct from "./screens/SingleProduct";
import Login from "./screens/Login";
import Register from "./screens/Register";
import ProfileScreen from "./screens/ProfileScreen";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import NotFound from "./screens/NotFound";
import PrivateRoute from "./components/PrivateRoute.js";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/search/:search" element={<HomeScreen />} />
        <Route path="/page/:pagenumber" element={<HomeScreen />} />
        <Route
          path="/search/:search/page/:pageNumber"
          element={<HomeScreen />}
        />
        <Route path="/products/:productId" element={<SingleProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfileScreen />
            </PrivateRoute>
          }
        />
        <Route path="/cart/:productId?" element={<CartScreen />} />
        <Route
          path="/shipping"
          element={
            <PrivateRoute>
              <ShippingScreen />
            </PrivateRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <PrivateRoute>
              <PaymentScreen />
            </PrivateRoute>
          }
        />
        <Route
          path="/placeOrder"
          element={
            <PrivateRoute>
              <PlaceOrderScreen />
            </PrivateRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <PrivateRoute>
              <OrderScreen />
            </PrivateRoute>
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
