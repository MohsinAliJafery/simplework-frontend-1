import React from 'react'
import PersonCard from "../components/ProductivityHacks/PersonCard.jsx"
import GuidesAndBlogs from "../components/Common/GuidesAndBlogs.jsx"
import productivity1 from "../assets/Images/productivity1.svg"
import productivity2 from "../assets/Images/productivity2.svg"
import productivity3 from "../assets/Images/productivity3.svg"
import ProductivitySearch from '../components/ProductivityHacks/ProductivitySearch.jsx'
import { FaArrowRightLong } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import RecentPost from '../components/ProductivityHacks/RecentPost.jsx'
import ReplyForm from '../components/ProductivityHacks/ReplyForm.jsx'
import ManagementTeam from '../components/ProductivityHacks/ManagementTeam.jsx'


const ProductivityHacks = () => {

    const heading1 = (
        <div>
            <h1 className='font-bold text-4xl text-center'>
                Master Your Day With These 10  <br />Productivity Hacks
            </h1>
        </div>
    )
    const desc1 = (
        <h1>Boost Your Efficiency And Get More Done With These Proven Productivity Techniques For Professionals.</h1>
    )
    const heading2 = (
        <div>
            <h1 className='font-bold text-4xl text-center'>
                Transform Your Workflow <br /> with <span className='text-yellow'>Simplework</span>
            </h1>
        </div>
    )
    const desc2 = (
        <h1>Discover Tools And Insights That Simplify Your Processes, Enhance Productivity, And Empower <br /> Your Team To Achieve More.</h1>
    )

    const name = (
        <div>
            <h1 className='text-lg font-bold pl-7'>John Cina</h1>
        </div>
    )
    const details = (
        <div>
            <p className='text-sm pt-1 pl-7'>Lectus quam id leo in vitae turpis nisl pretium <br /> fusce id velit tortor. Dignissim cras tincidunt <br /> lobortis feugiat. Facilisis sed odio morbi quis <br /> commodo odio.</p>
        </div>
    )
    const border1 = (
        <div className='mx-72'>
            <hr className='w-[65%] border-gray-700'/>
        </div>
    )

    const search = (
        <div className='p-2 bg-[#FFFFFF] w-72 h-10 text-base test-sm rounded flex items-center justify-between'>
            <input type="text" placeholder="Searching" className='placeholder-black outline-none text-black' />
            <IoSearch className='p-1 bg-black size-6 rounded' />
        </div>
    )

    const Category = (
        <div className='text-xl'>
            <ul className='space-y-2 w-72'>
                {['Productivity Tips',
                    'Team Collaboration',
                    'Workflow Automation',
                    'Advanced Features',
                    'Simplework Updates'].map((list, index) => {
                        return (
                            <li key={index} className='w-72 h-10 p-2 flex items-center justify-between text-base text-black bg-[#FFFFFF] rounded'>
                                {list}
                                <FaArrowRightLong size={20} />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
    const bullets = (
        <div className='text-sm pl-12'>
            <ul className='list-disc marker:text-main'>
                <li className='mb-5 leading-relaxed'>Maecenas sit amet diam ut lacus dignissim <br /> tincidunt et eu mi.</li>
                <li className='mb-5 leading-relaxed'>Quisque ac lectus augue. </li>
                <li className='mb-5 leading-relaxed'>Etiam ut neque id ipsum rhoncus pulvinar. Sed <br /> id dolor dui. </li>
                <li className='mb-5 leading-relaxed'>Quisque luctus malesuada tellus <br /> non imperdiet. </li>
            </ul>
        </div>
    )

    return (
        <>
            <GuidesAndBlogs heading={heading1} desc={desc1} />
            <ProductivitySearch img={productivity1} searchInput={search} categorylist={Category} />
            <RecentPost/>
            <PersonCard img={productivity3} details={bullets} />
            <ManagementTeam/>
            <PersonCard img={productivity2} name={name} details={details} border={border1}/>
            <ReplyForm />
            <GuidesAndBlogs heading={heading2} desc={desc2} />
        </>
    )
}

export default ProductivityHacks