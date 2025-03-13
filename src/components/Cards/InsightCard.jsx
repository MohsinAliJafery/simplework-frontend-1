import React from 'react'
import { insightCardData } from '../../data';

const InsightCard = () => {
  return (
    <>
      <div className='mx-40 my-10'>
        <div>
          <h1 className="text-white text-5xl text-center font-bold">
            Latest <span className="text-main font-normal">Insight</span> from SimpleWork
          </h1>
          <p className="text-sm text-center text-white py-5">
            Discover expert tips, actionable strategies, and the latest trends to optimize your workflow and <br /> boost productivity. Dive into our curated content for insights that matter
          </p>
        </div>

        <div className=' grid grid-cols-3 gap-5 mx-32 '>
          {insightCardData.map((item) => (
            <div key={item.id} className='relative flex justify-center'>
              <div className="bg-gradient-to-br from-main to-sec bg-white">
                <div>
                  <img
                    className="w-96 h-60 object-cover"
                    src={item.imgUrl}
                    alt="Insight Image"
                  />
                </div>

                <div className='bg-gradient-to-br from-main to-sec'>
                  <div className="flex items-center p-2">
                    <p className="font-bold text-white">{item.title}</p>
                  </div>
                  <div className="flex justify-between px-2">
                    <p className="text-sm text-white">{item.desc}</p>
                  </div>
                  <div className="p-2">
                    <p className="text-sm font-bold text-yellow pb-2">{item.author}</p>
                  </div>
                  <div className=" p-4">
                    <button className="px-5 py-2 text-sm bg-white rounded text-sec">{item.button}</button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default InsightCard;