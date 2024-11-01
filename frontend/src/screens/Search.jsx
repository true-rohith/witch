import cancleLogo from "../assets/profile/cancleLogo.png";
import { CiSearch, CiHeart } from "react-icons/ci";
import { searchClose } from "../../redux/slices/IsSearchOpen";
import { useDispatch } from "react-redux";
import URL from "../../constants/url";
import axios from "axios";
import Card from "../components/Search/Card";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/LoadingComponent";

const Search = () => {
  const dispatch = useDispatch();

  const Navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const url = URL;

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${url}/search`, { search });
      if (Array.isArray(response.data)) {
        setProductsData(response.data);
      }
      console.log(response.data); // Log the actual response data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchClose());
    Navigate(`/allproducts?value=${search}`);
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <div className="w-full h-full p-8 bg-white">
      <div className="flex w-full h-[70px] justify-between items-center gap-4 rounded-3xl border border-gray-400 p-8 bg-gray-300 ">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-4 w-full h-[50px]"
        >
          <button>
            <CiSearch size={24} />
          </button>
          <input
            className="w-full h-full border border-gray-500 rounded-2xl pl-3"
            type="text"
            placeholder="Search Products Here..."
            autoFocus
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </form>
        <img
          className="w-[28px] cursor-pointer"
          onClick={() => dispatch(searchClose())}
          src={cancleLogo}
          alt=""
        />
      </div>

      <div className="relative w-full h-full p-6">
        <div className="w-full h-full flex flex-wrap justify-center gap-5 bg-gray-300 p-6">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {productsData.map((data, index) => {
                if (index < 8)
                  return (
                    <>
                      <Card key={data.id} product={data} />
                    </>
                  );
              })}
            </>
          )}
        </div>
        <Link
          className="absolute bottom-10 flex justify-center w-full"
          to={"/allproducts"}
        >
          <div
            onClick={() => dispatch(searchClose())}
            className=" flex justify-center items-center rounded-xl p-2 h-[40px] bg-white mt-4 text-blue-600 cursor-pointer"
          >
            See All Products...
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Search;
