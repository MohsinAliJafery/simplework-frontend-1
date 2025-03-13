import React from 'react'

const ProductivityHacks = ({name, details, img, border}) => {
    return (
        <>
            <div>{border}</div>
            <div className='mx-72 my-10 text-white'>
                <div className='flex'>
                    <div className=''>
                        <img className='w-56' src={img} alt="productivityImage" />
                    </div>
                    <div className=' my-auto'>
                        <h1>{name}</h1>
                        <p>{details}</p>
                    </div>
                </div>
            </div>
            <div>{border}</div>
        </>
    )
}

export default ProductivityHacks