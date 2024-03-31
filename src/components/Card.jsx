import React from 'react'

const Card = ({ code, symbol, rate, desc }) => {
  return (
    <div className="bg-white shadow-lg overflow-hidden w-60 rounded-xl duration-500 hover:scale-105 hover:shadow-xl cursor-pointer">
      <div className="pt-2 flex flex-col justify-between h-64">
        <h1 className="text-2xl font-bold text-slate-700 text-center">Currency Rate</h1>
        <h2 className="text-md font-semibold text-gray-700 text-center">{code} - {desc}</h2>
        <div className='w-full bg-slate-600	'>
          <p className="py-2 text-white text-center text-md font-semibold" dangerouslySetInnerHTML={{ __html: symbol + ' ' + rate }}/>
        </div>
      </div>
    </div>
  )
}

export default Card