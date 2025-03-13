import React from 'react'
import InsightCard from '../components/Cards/InsightCard'
import GuidesAndBlogs from '../components/Common/GuidesAndBlogs'

const Blogs = () => {

  const heading1 = (
    <div>
      <h1 className='font-bold text-4xl px-56 text-center'> The <span className='text-yellow'>Simplework</span> Blog </h1>
    </div>
  );

  const heading2 = (
    <div>
      <h1 className='font-bold text-4xl px-56 text-center'>Transform Your Workflow <br/> with  <span className='text-yellow'>Simplework</span></h1>
    </div>
  );

  return (
    <div className="w-full pb-10">
      <GuidesAndBlogs heading={heading1} desc="Your go-to resource for simplifying workflows, boosting productivity, and achieving more every day." />
      <InsightCard />

      <GuidesAndBlogs heading={heading2} desc="Discover tools and insights that simplify your processes, enhance productivity, and empower your team to achieve more." btn="Get Started For Free" />


    </div>
  )
}

export default Blogs