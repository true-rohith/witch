import axios from "axios";
import url from "../constants/url";
import Cookies from "js-cookie";

const userData = async () => {
  const token = Cookies.get("token");
  try {
    const respose = await axios.post(`${url}/profile`, {
      jwt_token: token,
    });
    if (respose.status === 200) {
      return respose.data;
    } else {
      console.log(error);
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default userData;
