import Bestservice from "../assets/recentupdate/Group4.png";
import Support from "../assets/recentupdate/support.png";
import Reviews from "../assets/recentupdate/reviews.png";
import Policy from "../assets/recentupdate/policy.png";

export default function Recentupdate() {
  return (
    <div className="bg-black pt-[10%] ml-[5%] mr-[4%]">
      <div className="flex flex-wrap  gap-y-5 gap-x-3 mx-[2%]">
        {/* Card 1 */}
        <div className="mx-2 w-full sm:w-[48%] md:w-[31%] lg:w-[23%] text-white bg-[#9B006D] flex flex-col items-center justify-center h-[200px]">
          <div>
            <img src={Bestservice}
             style={{ width: 60 ,height: 60 }}
              alt="Best Service" />
          </div>
          <h1 className="text-md font-bold uppercase">Best Service</h1>
        </div>
        {/* Card 2 */}
        <div className="mx-2 w-full sm:w-[48%] md:w-[31%] lg:w-[23%] text-white bg-[#9B006D] flex flex-col items-center justify-center h-[200px]">
          <div>
            <img src={Support}
            style={{ width: 60 ,height: 60 }}
            alt="24/7 Support" />
          </div>
          <h1 className="text-md font-bold uppercase">24/7 Support</h1>
        </div>
        {/* Card 3 */}
        <div className="mx-2 w-full sm:w-[48%] md:w-[31%] lg:w-[23%] text-white bg-[#9B006D] flex flex-col items-center justify-center h-[200px]">
          <div>
            <img src={Policy}
             style={{ width: 60 ,height: 60 }}
            alt="Policy" />
          </div>
          <h1 className="text-md font-bold uppercase">Policy</h1>
        </div>
        {/* Card 4 */}
        <div className="mx- w-full sm:w-[48%] md:w-[31%] lg:w-[23%] text-white bg-[#9B006D] flex flex-col items-center justify-center h-[200px]">
          <div>
            <img 
            src={Reviews} 
            style={{ width: 60 ,height: 60 }}
            alt="Review" />
          </div>
          <h1 className="text-md font-bold uppercase">Review</h1>
        </div>
      </div>
    </div>
  );
}
