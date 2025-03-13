import React from 'react'

const ProductivitySearch = ({ img, searchInput, categorylist }) => {

    return (
        <>
            <div className='mx-72 my-20 text-white flex gap-10 justify-between items-center'>
                <div className="w-2/3">
                    <img className='object-cover h-96' src={img} alt="productivity image" />
                </div>

                <div className='space-y-8'>
                    <div className='text-2xl space-y-2'>
                        <h1>Search</h1>
                        {searchInput}
                    </div>

                    <div className='text-2xl space-y-2'>
                        <h1>Categories</h1>
                        {categorylist}
                    </div>
                </div>

            </div>

        </>
    )
}

export default ProductivitySearch