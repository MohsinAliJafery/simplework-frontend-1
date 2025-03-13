import React from 'react'

const InsightCard = ({data, title, desc}) => {
  return (
    <>
      <div className='mx-40 my-10'>
        <div>
          <h1 className="text-white text-5xl text-center font-bold">
            {title}
          </h1>
          <p className="text-sm text-center text-white py-5">
            {desc}
          </p>
        </div>

        <div className='grid grid-cols-3 gap-5 mx-32'>
          {data?.map((item) => (
            <div key={item.id} className='flex justify-center'>
              <div className="bg-gradient-to-br from-main to-sec bg-white">
                <div>
                  <img
                    className="w-96 h-60 object-cover"
                    src={item.imgUrl}
                    alt="Insight Image"
                  />
                </div>

                <div className='bg-gradient-to-br from-customPink to-customPurple p-5'>
                  <div className="">
                    <p className="font-bold text-white">{item.title}</p>
                  </div>
                  <div className="pt-3">
                    <p className="text-sm text-white">{item.desc}</p>
                  </div>
                  <div className="pt-3">
                    <p className="text-sm font-bold text-yellow pb-2">{item.author}</p>
                  </div>
                  <div className="bottom-5 pt-3">
                    <button className="px-5 py-2 text-sm bg-white rounded ">{item.button}</button>
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
