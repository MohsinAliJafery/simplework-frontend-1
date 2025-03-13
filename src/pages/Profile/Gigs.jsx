import React from "react";
import { FaStar } from "react-icons/fa6";
import GigCard from "../../components/Cards/GigCard";

const Gigs = () => {
  return (
    <div className="flex flex-wrap gap-5 justify-between">
      <GigCard />
      <GigCard />
      <GigCard />
      <GigCard />
    </div>
  );
};

export default Gigs;
