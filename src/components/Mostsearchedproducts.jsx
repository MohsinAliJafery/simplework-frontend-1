import Graphics from "../assets/populargig1.jpg";
import DigitalMarketing from "../assets/populargig2.jpg";
import Writing from "../assets/populargig3.png";
import VideoAnimation from "../assets/populargig4.png";
import MusicAudio from "../assets/populargig5.jpg";
import Programmers from "../assets/populargig6.webp";
import Business from "../assets/populargig7.jpg";
import Dataset from "../assets/populargig8.jpg";
import { getCategories } from "../Api_Requests/Api_Requests";
import { useEffect, useState } from "react";

const sampleProducts = [
  {
    name: "Graphics Design",
    imgSrc: Graphics,
  },
  {
    name: "Digital Marketing",
    imgSrc: DigitalMarketing,
  },
  {
    name: "Writing and Translation",
    imgSrc: Writing,
  },
  {
    name: "Video and Animation",
    imgSrc: VideoAnimation,
  },
  {
    name: "Music & Audio",
    imgSrc: MusicAudio,
  },
  {
    name: "Programming",
    imgSrc: Programmers,
  },
  {
    name: "Business",
    imgSrc: Business,
  },
  {
    name: "Data",
    imgSrc: Dataset,
  },
];
//
export default function MostSearchedProducts() {
  const [products, setProducts] = useState(null);
  const fetchCategories = async () => {
    // Fetch categories from a server
    const response = await getCategories();
    if (response.status === 200) {
      const data = response.data;
      setProducts(data.categories);
    } else {
      setProducts(sampleProducts);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="bg-black">
      <h1 className="text-4xl md:text-5xl text-white text-center py-5">
        Most <span className="text-[#DE0588]">Searched </span>
        <span className="font-bold">Products</span>
      </h1>
      <div className="text-white flex justify-center flex-wrap mx-[5%] gap-y-10 gap-x-7">
        {products &&
          sampleProducts.map((product, index) => (
            <div
              key={index}
              className="w-full sm:w-[45%] md:w-[30%] lg:w-[22%]  flex flex-col items-center"
              style={{ height: "350px" }} // Fixed height for all cards
            >
              <div className="w-full h-[70%] flex items-center justify-center overflow-hidden">
                <img
                  src={product.imgSrc}
                  alt={product.category}
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="mt-2 w-full uppercase bg-[#460BCB] py-4 md:py-5 text-md md:text-lg font-bold h-[30%]">
                {product.name}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
