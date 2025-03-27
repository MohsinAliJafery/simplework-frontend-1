import { useEffect } from "react";
import { GetLoggedInUser } from "../../Api_Requests/Api_Requests";
import MostSearchedProducts from "../../components/Mostsearchedproducts";
import Populargigs from "../../components/Populargigs";
import Recentupdate from "../../components/Recentupdate";
import GigSlider from "../../components/Sliders/GigSlider";
import Hero from "../../components/navbar2/Hero";

function Home() {
  const handleCurrentUser = async () => {
    if (localStorage.getItem("token")) {
      const response = await GetLoggedInUser();
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.userData));
        Navigate("/");
      }
    }
  };
  useEffect(() => {
    // handleCurrentUser();
  }, []);
  return (
    <>
      <div className="w-full bg-black pb-10">
        <Hero />
        <GigSlider />
        <MostSearchedProducts />
        <Recentupdate />
        <Populargigs />
      </div>
    </>
  );
}

export default Home;
