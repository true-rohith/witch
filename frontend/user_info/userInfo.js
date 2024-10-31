import axios from "axios";
import url from "../constants/url";

const userData = async () => {
  try {
    const respose = await axios.get(`${url}/profile`, {
      withCredentials: true,
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
