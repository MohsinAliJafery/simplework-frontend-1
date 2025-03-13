import React from 'react'

const ReplyForm = () => {
  return (
    <>
    <div className='text-white mx-72 my-10'>
        <h1 className='text-xl font-semibold'>Leave A Reply</h1>
        <p className='text-sm mt-2'>Your Email Address Will Not Be Published. Required Fields Are Marked *</p>
        <div className='flex flex-col gap-2 my-8'>
            <input className='w-96 h-10 rounded-md bg-gray-950 placeholder-white pl-3' type="text" placeholder='Name*' />
            <input className='w-96 h-10 rounded-md bg-gray-950 placeholder-white pl-3' type="email" placeholder='Email*'/>
            <input className='w-96 h-10 rounded-md bg-gray-950 placeholder-white pl-3' type="text" placeholder='Comment'/>
        </div>
        <div>
            <button className='bg-gradient-to-br from-sec to-main px-4 py-2 rounded-md'>
                Post Comment
            </button>
        </div>
    </div>
    </>
  )
}

export default ReplyForm