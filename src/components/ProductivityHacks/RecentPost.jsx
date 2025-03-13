import React from "react";
import { recentPostData } from "../../data"
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { NavLink } from "react-router-dom";



const RecentPost = () => {
    return (
        <>
            <div class="mx-72 flex">
                <div class="text-white font-sans w-[70%]">

                    <div>
                        <div>
                            <p class=" mb-1 text-yellow">
                                "By Sarah Collins | January 18, 2025"
                            </p>
                        </div>
                        <div className="text-white text-sm my-3">
                            <p class="mb-6">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis ultrices nisl, eget <br /> pellentesque erat tincidunt at. Nulla efficitur enim quis egestas gravida. Duis ut mi ut lacus <br /> vulputate accumsan. Nullam ac ultrices ante. Mauris condimentum, diam non volutpat <br /> tincidunt, ante lacus eleifend odio, nec tincidunt purus nisl id diam. Donec ornare in tellus <br /> et posuere. Aliquam sed enim tellus. Nulla bibendum viverra scelerisque. Nulla rutrum <br /> bibendum commodo. Ut vehicula eros a condimentum rhoncus.
                            </p>
                            <p>
                                Proin tincidunt urna sapien, ut ornare odio eleifend in. Pellentesque convallis nisi eu <br /> feugiat condimentum. Etiam eu interdum nisi. Nam purus urna, laoreet ut <br /> fermentum id, ornare id magna. Vivamus vitae feugiat magna, id accumsan nibh. <br /> Aliquam interdum et odio sed finibus.
                            </p>
                        </div>
                    </div>

                    <div >
                        <div>
                            <h2 class="text-3xl font-bold mb-4">
                                Morbi Mattis Nunc Eu Nibh Aliquet
                            </h2>
                        </div>
                        <div className="text-sm my-3">
                            <p class="mb-6">
                                But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain <br /> was born and I will give you a complete account of the system, and expound the actual <br /> teachings of the great explorer of the truth, the master-builder of human happiness.
                            </p>
                            <p>
                                No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those <br /> who do not know how to pursue pleasure rationally encounter consequences that are <br /> extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain <br /> of itself, because it is pain, but because occasionally circumstances occur in which toil an <br />d pain can procure him some great pleasure.
                            </p>
                        </div>
                    </div>

                    <div>
                        <div>
                            <h2 class="text-3xl font-bold mb-4">
                                Eiusmod Tempor Incididunt Ut Labore
                            </h2>
                        </div>
                        <div className="text-white text-sm">
                            <p class="mb-4">
                                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium <br /> voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati <br /> cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est <br /> laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                            </p>
                        </div>
                    </div>

                    {/* <div>
                        <div>
                            <h2 class="text-3xl font-bold mb-4">
                                Let our investment management team
                            </h2>
                        </div>
                        <div className="text-white text-sm ">
                            <p class="mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate vestibulum <br /> Phasellus rhoncus, dolor eget viverra pretium, dolor tellus aliquet nunc, vitae ultricies erat elit <br /> eu lacus. Vestibulum non justo consectetur, cursus ante, tincidunt sapien. Nulla quis diam <br /> sit amet turpis interdum accumsan quis nec enim. Vivamus faucibus ex sed nibh egestas <br /> elementum. Mauris et bibendum dui. Aenean consequat pulvinar luctus. Suspendisse <br /> consectetur tristique tortor
                            </p>
                        </div>
                    </div> */}

                    {/* <div class="border-b-2">
                        <div class="max-w-2xl  px-0 flex flex-wrap items-center justify-between text-sm">
                            <div>
                                <span class="text-white py-1 px-3 rounded-md text-2xl">
                                    Tags:
                                </span>
                                <span class="text-white py-1 px-3 rounded-md">Business</span>
                                <span class="text-white py-1 px-3 rounded-md">Marketing</span>
                                <span class="text-white py-1 px-3 rounded-md">Services</span>
                            </div>
                            <div class="flex space-x-4  text-bold items-center ">
                                <span class="text-white py-1 px-3 text-2xl">Shares</span>
                                <NavLink><FaFacebookF /></NavLink>
                                <NavLink><FaTwitter /></NavLink>
                                <NavLink><FaInstagram /></NavLink>
                                <NavLink><FaLinkedinIn /></NavLink>

                            </div>
                        </div>
                    </div> */}
                </div>

                <div class="w-[30%]">
                    <div><h1 class="text-xl text-main ">Recent Posts</h1></div>
                    {recentPostData.map((data) => {
                        return (

                            <div class="mt-4 flex max-w-sm mx-auto w-72">
                                <div>
                                    <img
                                        class="w-32"
                                        src={data.img}
                                        alt="Card Image"
                                    />
                                </div>
                                <div className="pl-2 w-36">
                                    <p class="text-yellow text-sm mt-1 font-light  ">
                                        {data.textOne}
                                    </p>
                                    <p class=" font-bold text-white mt-3  text-xs leading-[1.25]">
                                        {data.textTwo}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default RecentPost;  