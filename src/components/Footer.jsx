import React from "react";
import Instagram from "../../src/assets/icons/instagram.png";
import linkedin from  "../../src/assets/icons/linkidin.png";
import facebook from  "../../src/assets/icons/facebook.png"
import twitter from  "../../src/assets/icons/twitter.png"
const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-[#3b09aa] to-[#240666] text-white py-8 font-poppins realtive z-[-10]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 p-6">
          {/* Left Section */}
          <div className="mb-6 md:mb-0 text-center md:text-left md:w-1/">
            <h2 className="text-3xl sm:text-3xl font-bold mb-2">SimpleWork</h2>
            <p className="text-sm sm:text-1xs leading-6 max-w-md mx-auto md:mx-0">
              There are many variations of passages <br/> of Lorem Ipsum available,
              but the majority <br/> have suffered alteration in some look <br/> even
              slightly believable.
            </p>
            <div className="flex justify-center md:justify-start space-x-1 mt-4 gap-8">
              <a href="#" className="hover:text-gray-300 text-base sm:text-sm">
                <img src={Instagram} alt="instagram_img" />
                              
                </a>
              <a href="#" className="hover:text-gray-300 text-base sm:text-sm">
                <img src={linkedin} alt="linkedin_img" />
              </a>
              <a href="#" className="hover:text-gray-300 text-base sm:text-sm">
              <img src={facebook} alt="facebook_img" />
              </a>
              <a href="#" className="hover:text-gray-300 text-base sm:text-sm">
               <img src={twitter} alt="twitter_img" />
              </a>
            </div>
          </div>

          {/* Right Sections */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm sm:text-xs w-full md:w-1/2">
            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-2 text-left text-lg  sm:text-lg">Categories</h3>
              <ul className="flex flex-col gap-2 list-disc pl-4">
                <li>
                  <a href="#" className="hover:text-gray-300 text-sm">
                    Graphics & Design
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300 text-sm">
                    Digital Marketing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300 text-sm">
                    Writing & Translation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300 text-sm">
                    Video & Animation
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold mb-2 text-left text-lg sm:text-lg">Resources</h3>
              <ul className="flex flex-col gap-2 list-disc pl-4">
                <li>
                  <a href="#" className="hover:text-gray-300 text-sm">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300 text-sm">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300 text-sm">
                    Legal
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300 text-sm">
                    Affiliates
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold mb-2 text-left text-lg sm:text-lg">Company</h3>
              <ul className="flex flex-col gap-2 list-disc pl-4">
                <li>
                  <a href="#" className="hover:text-gray-300 text-sm">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300 text-sm">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300 text-sm">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-300 text-sm">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-20 text-center border-t border-gray-600 pt-4 text-sm sm:text-sm">
          ©2022 Ruby. All Rights Reserved by Simplework.com
        </div>
      </div>
    </footer>
  );
};

export default Footer;
