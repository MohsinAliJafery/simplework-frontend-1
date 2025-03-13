import { color } from 'framer-motion';
import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const ManagementTeam = () => {
    return (
        <>
            <div className='mx-72 w-[50%]'>
                <div>
                    <div>
                        <h2 class="text-3xl text-white font-bold mb-4">
                            Let our investment management team
                        </h2>
                    </div>
                    <div className="text-white text-sm ">
                        <p class="mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate vestibulum <br /> Phasellus rhoncus, dolor eget viverra pretium, dolor tellus aliquet nunc, vitae ultricies erat elit <br /> eu lacus. Vestibulum non justo consectetur, cursus ante, tincidunt sapien. Nulla quis diam <br /> sit amet turpis interdum accumsan quis nec enim. Vivamus faucibus ex sed nibh egestas <br /> elementum. Mauris et bibendum dui. Aenean consequat pulvinar luctus. Suspendisse <br /> consectetur tristique tortor
                        </p>
                    </div>
                </div>
                <div className="pb-5">
                    <div class="max-w-2xl  px-0 flex flex-wrap items-center gap-16 text-sm">
                        <div>
                            <span class="text-white py-1 px-3 rounded-md text-2xl">
                                Tags:
                            </span>
                            <span class="text-white py-1 px-3 rounded-md">Business</span>
                            <span class="text-white py-1 px-3 rounded-md">Marketing</span>
                            <span class="text-white py-1 px-3 rounded-md">Services</span>
                        </div>
                        <div class="flex space-x-4 text-white text-bold items-center ">
                            <span class="text-white py-1 px-3 text-2xl">Shares</span>
                            <NavLink><FaFacebookF /></NavLink>
                            <NavLink><FaTwitter /></NavLink>
                            <NavLink><FaInstagram /></NavLink>
                            <NavLink><FaLinkedinIn /></NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManagementTeam