import React from 'react'
import Button from '../common/Button'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="max-w-screen-xl md:items-center container mx-auto px-2 mb:px-10 py-5 flex flex-col md:flex-row">
      <p className="font-extrabold text-2xl">Pixelify</p>
      <div className="md:ml-auto flex flex-col md:flex-row md:items-center">
        <Link href="https://medium.com/@joekarlsson/how-to-pixelate-images-with-html5-and-javascript-acf1bd58c17e">
          <a target="_blank" className="py-5 text-lg md:py-0 md:mr-10">Contri</a>
        </Link>
        <Link href="https://github.com/Vong3432">
          <a target="_blank">
            <Button type="primary" tailwindClasses="shadow-lg font-bold text-sm md:text-base" text="Follow me on Github." />
          </a>          
        </Link>        
      </div>
    </div>
  )
}

export default Navbar
