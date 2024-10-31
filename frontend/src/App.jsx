import "./App.css";
import Home from "./screens/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./screens/ProductPage";
import { cartClicked } from "../redux/slices/IsCartOpen";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Loading from "./screens/Loading";
import Logout from "./screens/Logout";
import ProfilePage from "./screens/Profile";
import { loggedIn, loggedOut } from "../redux/slices/isLoggedIn";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import Admin from "./screens/Admin";
import Search from "./screens/Search";
import AllProducts from "./screens/AllProducts";
import { dataFetched } from "../redux/slices/UserInfo";
import userData from "../user_info/userInfo";

function App() {
  const cookie = new Cookies();

  const isOpen = useSelector((state) => state.isCartOpen.value);
  const isLoading = useSelector((state) => state.IsLoading.value);
  const isLoggedIn = useSelector((state) => state.IsLoggedIn.value);
  const isSearchOpen = useSelector((state) => state.IsSearchOpen.value);
  const userInfo = useSelector((state) => state.UserInfo.value);

  const dispatch = useDispatch();
  console.log(isLoggedIn);

  function setLoggedIn() {
    const token = cookie.get("token");
    // console.log(token);
    if (!token) {
      dispatch(loggedOut());
    } else {
      dispatch(loggedIn());
    }
  }

  const fetchUserData = async () => {
    try {
      const res = await userData();
      dispatch(dataFetched(res[0]));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoggedIn();
    fetchUserData();
  }, []);

  return (
    <>
      <BrowserRouter>
        {!isSearchOpen && (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<ProductPage />} />
            <Route
              path="/profile"
              element={isLoggedIn ? <ProfilePage /> : <Login />}
            />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/allproducts" element={<AllProducts />} />
          </Routes>
        )}

        {/* cart  */}
        {isLoggedIn && (
          <div
            className={`fixed top-[68px] right-0 h-[75%] w-[40%] bg-white shadow-lg transition-transform duration-500 ease-in-out ${
              isOpen ? "transform translate-x-0" : "transform translate-x-full"
            } overflow-scroll`}
            // onBlur={() => dispatch(cartClicked())}
          >
            <Cart useInfo={userInfo} />
          </div>
        )}

        {/* search page*/}
        {isSearchOpen && (
          <div className="w-full h-full absolute top-0 z-20">
            <Search />
          </div>
        )}

        {/* loading */}
        {isLoading && (
          <div className="w-full h-full absolute top-0 z-30">
            <Loading />
          </div>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
