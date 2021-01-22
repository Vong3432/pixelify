import React from 'react'
import Button from '../common/Button'

const Navbar = () => {
  return (
    <div className="max-w-screen-xl items-center container mx-auto px-2 mb:px-10 py-5 flex">
      <p className="font-extrabold text-2xl">Pixelify</p>
      <div className="ml-auto">
        <Button type="primary" tailwindClasses="shadow-lg font-bold text-sm md:text-base" text="Follow me on Github." />
      </div>
    </div>
  )
}

export default Navbar
