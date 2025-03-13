import Graphics1 from "../assets/populargigs/popularGig1.svg";
import Graphics2 from "../assets/populargigs/popularGig2.svg";
import Graphics3 from "../assets/populargigs/popularGig3.svg";
import Graphics4 from "../assets/populargigs/popularGig4.svg";
import Graphics5 from "../assets/populargigs/popularGig5.svg";
import Graphics6 from "../assets/populargigs/popularGig6.svg";

const products = [
  {
    name: "Graphics Design",
    imgSrc: Graphics1,
    disc: "MAKE MORE DAILY PRODUCTIVE FLOW LIKE PRO.",
  },
  {
    name: "Graphics Design",
    imgSrc: Graphics2,
    disc: "MAKE MORE DAILY PRODUCTIVE FLOW LIKE PRO.",
  },
  {
    name: "Graphics Design",
    imgSrc: Graphics3,
    disc: "MAKE MORE DAILY PRODUCTIVE FLOW LIKE PRO.",
  },
  {
    name: "Graphics Design",
    imgSrc: Graphics4,
    disc: "MAKE MORE DAILY PRODUCTIVE FLOW LIKE PRO.",
  },
  {
    name: "Graphics Design",
    imgSrc: Graphics5,
    disc: "MAKE MORE DAILY PRODUCTIVE FLOW LIKE PRO.",
  },
  {
    name: "Graphics Design",
    imgSrc: Graphics6,
    disc: "MAKE MORE DAILY PRODUCTIVE FLOW LIKE PRO.",
  },

  // You can add more products here in the same format
];

export default function Populargigs() {
  return (
    <div className="bg-black ">
      <h1 className="text-5xl text-white text-center py-5">
        The gigs <span className="text-[#DE0588]">popular </span>
        in simplework
      </h1>
      <div className="text-white flex justify-center flex-wrap mx-[5%] gap-y-10  gap-x-7">
        {" "}
        {/* Flexbox to handle layout */}
        {products.map((product, index) => (
          <div
            key={index}
            className="w-80 flex justify-center flex-col items-center"
          >
            <div className="w-[100%] p-15  flex items-center justify-center h-[75%] bg-transparent">
              <img src={product.imgSrc} alt={product.name} className="" />
            </div>
            <div className="w-full bg-gradient-to-l from-main to-sec px-5 py-3 h-[25%] ">
              <h1 className="text-[yellow] ">{product.name}</h1>
              <p>{product.disc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
