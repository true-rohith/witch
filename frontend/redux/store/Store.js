import { configureStore } from "@reduxjs/toolkit";
import IsCartOpenReducer from "../slices/IsCartOpen";
import IsLoading from "../slices/IsLoading";
import IsLoggedIn from "../slices/isLoggedIn";
import IsSearchOpen from "../slices/IsSearchOpen";
import UserInfo from "../slices/UserInfo";
export default configureStore({
  reducer: {
    isCartOpen: IsCartOpenReducer,
    IsLoading: IsLoading,
    IsLoggedIn: IsLoggedIn,
    IsSearchOpen: IsSearchOpen,
    UserInfo: UserInfo,
  },
});
