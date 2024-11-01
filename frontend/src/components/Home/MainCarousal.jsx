import React, { useEffect, useState } from "react";
import main1 from "../../assets/main1.png";
import main2 from "../../assets/main2.png";
import main3 from "../../assets/main3.png";
import main4 from "../../assets/main4.png";

const MainCarousal = () => {
  const [image, setImage] = useState(1);
  const arr = [1, 2, 3, 4];

  function scroll() {
    setImage((prevImage) => (prevImage === 4 ? 1 : prevImage + 1));
  }

  useEffect(() => {
    const interval = setInterval(scroll, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mt-[80px]">
      <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[500px]">
        <img
          className={`w-full h-full object-cover absolute ${
            image === 1 ? "block" : "hidden"
          }`}
          src={main1}
          alt="Image Main 1"
        />
        <img
          className={`w-full h-full object-cover absolute ${
            image === 2 ? "block" : "hidden"
          }`}
          src={main2}
          alt="Image Main 2"
        />
        <img
          className={`w-full h-full object-cover absolute ${
            image === 3 ? "block" : "hidden"
          }`}
          src={main3}
          alt="Image Main 3"
        />
        <img
          className={`w-full h-full object-cover absolute ${
            image === 4 ? "block" : "hidden"
          }`}
          src={main4}
          alt="Image Main 4"
        />
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-5 flex gap-3">
          {arr.map((ind) => (
            <div
              key={ind}
              className={`cursor-pointer w-3 h-3 rounded-full transition-colors duration-300 ${
                image === ind ? "bg-gray-600" : "bg-gray-300"
              }`}
              onClick={() => setImage(ind)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainCarousal;

// import React, { useEffect, useState } from "react";

// const MainCarousal = () => {
//   const [image, setImage] = useState(1);

//   const arr = [1, 2, 3, 4];

//   function schroll() {
//     setImage((prevImage) => (prevImage === 4 ? 1 : prevImage + 1));
//   }

//   useEffect(() => {
//     const interval = setInterval(() => schroll(), 2800);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <>
//       <div className="relative mt-[80px]">
//         <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[500px]">
//           <img
//             className={`w-full h-full object-cover absolute ${
//               image === 1 ? "block" : "hidden"
//             }`}
//             src="../src/assets/main1.png"
//             alt="Image Main 1"
//           />
//           <img
//             className={`w-full h-full object-cover absolute ${
//               image === 2 ? "block" : "hidden"
//             }`}
//             src="../src/assets/main2.png"
//             alt="Image Main 2"
//           />
//           <img
//             className={`w-full h-full object-cover absolute ${
//               image === 3 ? "block" : "hidden"
//             }`}
//             src="../src/assets/main3.png"
//             alt="Image Main 3"
//           />
//           <img
//             className={`w-full h-full object-cover absolute ${
//               image === 4 ? "block" : "hidden"
//             }`}
//             src="../src/assets/main4.png"
//             alt="Image Main 4"
//           />

//           {/* Dot Navigation */}
//           <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-5 flex gap-3">
//             {arr.map((ind) => (
//               <div
//                 key={ind}
//                 className={`cursor-pointer w-3 h-3 rounded-full transition-colors duration-300 ${
//                   image === ind ? "bg-gray-600" : "bg-gray-300"
//                 }`}
//                 onClick={() => setImage(ind)}
//               ></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MainCarousal;
