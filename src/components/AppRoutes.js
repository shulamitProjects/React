import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import UserContext from "../components/User/UserContext";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Store from "../pages/Store/Store";
import PageNotExist from "../pages/PageNotExist/PageNotExist";
import Window from "../pages/Store/Window";
import UseStore from "../pages/Store/UseStore";
import Basket from "../pages/Store/Basket";
const AppRoutes = () => {
  const authorizedRoutes = [{ path: "/store", Component: Store },
];

  const { user } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<Login/>}></Route>//
      {/* <Route path="/product" element={<Product />}></Route> */}
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/store" element={<Store/>}></Route>
      <Route path="/window" element={<Window/>}></Route>
      <Route path="/store2" element={<UseStore/>}></Route>
      <Route path="/basket" element={<Basket />}></Route>

      {authorizedRoutes.map((route) => {
        const userLoggedIn = !!user?.userToken;///
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              userLoggedIn ? (
                <route.Component></route.Component>///
              ) : (
                <Login></Login>///
              )
            }
          />
        );
      })}
      <Route path="*" element={<PageNotExist />}></Route>
    </Routes>
  );
};

export default AppRoutes;
