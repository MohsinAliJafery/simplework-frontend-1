import React from 'react'

const GuidesAndBlogs = ({ heading, desc, btn }) => {
  return (
    <>
      <div className='flex flex-col justify-center items-center bg-gradient-to-br from-main to-sec text-white rounded-3xl mx-72 my-10 gap-4 py-20'>
        {heading}
        <p className='px-52 text-center'>{desc}</p>
        {btn && <button className='px-5 py-2 text-sm bg-white text-black rounded'>{btn}</button>}

      </div>

    </>
  )
}

export default GuidesAndBlogs