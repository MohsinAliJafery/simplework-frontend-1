import InsightCard from "../components/Cards/InsightCard";
import GuidesAndBlogs from "../components/Common/GuidesAndBlogs";
import Category from "../components/Guides/Category";
import InfoCardWithImage from "../components/Guides/InfoCardWithImage";
import { exploreGuideData } from "../data";
import infoImage1 from "../assets/Images/InfoImage1.svg"
import infoImage2 from "../assets/Images/InfoImage2.svg"
import infoImage3 from "../assets/Images/InfoImage3.svg"
import infoImage4 from "../assets/Images/InfoImage4.svg"


const Guides = () => {
    const heading = (
        <div>
            <h1 className='font-bold text-4xl px-56 text-center'><span className='text-yellow'>Simplework</span> Guides </h1>
        </div>
    );

    const title = (
        <div>
            <h1><span className="text-main font-normal">Explore</span> Our Guides</h1>
        </div>
    )

    // --------------------------InfoTitle1----------------------------------------

    const Infotitle1 = (
        <div>
            <h1 className="font-bold text-4xl pb-5"><span className="font-normal text-main">Master Your</span> Day with <br /> These 10 Productivity <br /> Hacks</h1>
        </div>
    )
    const Infobutton1 = (
        <div className='mt-4 w-28 p-2 bg-gradient-to-br from-main to-sec text-white text-center rounded'>
            <button>Read More</button>
        </div>
    )
    const InfoImg1 = (
        <div className='pl-20'>
            <img src={infoImage1} alt="image1" />
        </div>
    )
    const InfoExample1 = (
        <div className="pt-2">
            <ul className="list-disc marker:text-main pl-4">
                <li>How to Create Your First Workflow in Simplework</li>
                <li>Top 5 Features to Boost Your Team's Collaboration</li>
                <li>10 Productivity Hacks for Modern Professionals</li>
            </ul>
        </div>
    )

    // --------------------------InfoTitle2----------------------------------------

    const Infotitle2 = (
        <div>
            <h1 className="font-bold text-4xl pb-5"><span className="font-normal text-main">Latest</span> Guides</h1>
        </div>
    )
    const Infobutton2 = (
        <div className='mt-4 w-28 p-2 bg-gradient-to-br from-main to-sec text-white text-center rounded'>
            <button>Read More</button>
        </div>
    )
    const InfoImg2 = (
        <div className='pr-20'>
            <img src={infoImage2} alt="image2" />
        </div>
    )
    const InfoExample2 = (
        <div className="pt-2">
            <ul className="list-disc marker:text-main pl-4">
                <li>Title</li>
                <li>Brief Snippet</li>
                <li>Publish Date</li>
            </ul>
        </div>
    )

    // --------------------------InfoTitle3----------------------------------------

    const Infotitle3 = (
        <div>
            <h1 className="font-bold text-4xl pb-5"><span className="font-normal text-main">Latest</span> with Video <br /> Tutorial</h1>
        </div>
    )
    const Infobutton3 = (
        <div className='mt-4 px-6 p-2 bg-gradient-to-br from-main to-sec text-white text-center rounded'>
            <button>Watch All Tutorials</button>
        </div>
    )
    const InfoImg3 = (
        <div className='pl-20'>
            <img src={infoImage3} alt="image3" />
        </div>
    )
    const InfoExample3 = (
        <div className="pt-2">
            <ul className="list-disc marker:text-main pl-4">
                <li>Introduction to Simplework</li>
                <li>Setting Up Workflow Automation</li>
                <li>Collaborating with Your Team</li>
            </ul>
        </div>
    )

    // --------------------------InfoTitle4----------------------------------------

    const Infotitle4 = (
        <div>
            <h1 className="font-bold text-4xl pb-5"><span className="font-normal text-main">Expert </span> Tips to Maximize Productivity</h1>
        </div>
    )
    const Infobutton4 = (
        <div className='mt-4 px-6 p-2 bg-gradient-to-br from-main to-sec text-white text-center rounded'>
            <button>Watch All Tutorials</button>
        </div>
    )
    const InfoImg4 = (
        <div className='pr-20'>
            <img src={infoImage4} alt="image4" />
        </div>
    )
    const InfoExample4 = (
        <div className="pt-2">
            <ul className="list-disc marker:text-main pl-4">
                <li>How to set clear priorities for daily tasks.</li>
                <li>The best tools to integrate with Simplework.</li>
                <li>Strategies for managing large teams effectively.</li>
            </ul>
        </div>
    )
    return (
        <>
            <GuidesAndBlogs heading={heading} desc="Unlock the full potential of Simplework with step-by-step guides, actionable tips, and expert advice." />

            <Category />

            <InfoCardWithImage title={Infotitle1} desc="Discover actionable strategies to get the most out of your workday." button={Infobutton1} img={InfoImg1} example={InfoExample1} />

            <InfoCardWithImage title={Infotitle2} desc="Show the 4-6 most recent guides with" button={Infobutton2} img={InfoImg2} example={InfoExample2} layout="reverse"/>

            <InfoCardWithImage title={Infotitle3} desc="Prefer visual learning? Watch our step-by-step tutorials to master Simplework’s features and tools." button={Infobutton3} img={InfoImg3} example={InfoExample3} />

            <InsightCard title={title} data={exploreGuideData} />

            <InfoCardWithImage title={Infotitle4} desc="Explore insights and strategies from productivity experts to optimize your workflow." button={Infobutton4} img={InfoImg4} example={InfoExample4} layout="reverse"/>
        </>
    )
}
export default Guides;
