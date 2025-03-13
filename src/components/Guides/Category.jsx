import React from 'react'
import { categoryData } from '../../data'

const Category = () => {
    return (
        <>
            <div className='mx-72 my-20'>
                <div>
                    <h1 className="text-white text-5xl text-center font-bold">
                        <span className="text-main font-normal">Browse</span> By Category
                    </h1>
                    <p className="text-sm text-center text-white py-5">
                        Find the resources you need faster by exploring our organized categories.
                    </p>
                </div>

                <div className='grid grid-cols-4 gap-4'>
                    {categoryData.map((item) => (
                        <div className='Card border border-blue w-56 mt-8 h-84'>
                            <div className='flex justify-center items-center h-56'>
                                <img src={item.img} alt="" />
                            </div>
                            <div className='bg-blue text-white py-2 h-28'>
                                <h1 className='font-bold text-xl text-center'>{item.title}</h1>
                                <p className='text-center text-sm px-1'>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default Category;