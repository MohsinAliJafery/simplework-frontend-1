import React from 'react';

const InfoCardWithImage = ({title, desc, example, button, img, layout }) => {
    return (
        <div className='text-white mx-72 my-24'>
                <div className = {`flex flex-row justify-between ${layout === "reverse" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className='sec-1 w-1/2'>
                        <div>
                            <h1>{title}</h1>
                        </div>
                        <div>
                            <p>{desc}</p>
                        </div>
                        <div>
                            <h1 className='text-2xl font-semibold pt-5'>Examples</h1>
                            <div>{example}</div>
                        </div>
                        <div>
                            <button>{button}</button>
                        </div>
                    </div>

                    <div className='w-1/2'>
                       {img}
                    </div>
                </div>
        </div>
    );
};

export default InfoCardWithImage;
