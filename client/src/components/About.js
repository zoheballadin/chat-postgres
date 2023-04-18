import React from 'react'
import { Navbar } from './Navbar'

export const About = () => {
  return (
    <div className='w-full h-full min-h-screen bg-[#FFE9B1]'>
        <Navbar/>
        <div className="bg-[#3B3486] rounded-lg h-[83vh] w-[80vw] mx-auto relative top-12 text-white text-justify">
            <h1 className='text-3xl font-semibold text-center py-3'>About This Project</h1>
            <br />
            <p className='text-2xl px-16'>This is a minimalistic realtime messaging application built by Zoheb Alladin.
            <br/><br/> The following technologies have been used in building this project:  
            </p>
            <ul className='text-2xl px-16 my-7'>
                <li>PostgreSQL</li>
                <li>Express JS</li>
                <li>React JS</li>
                <li>Node JS</li>
                <li>Socket.io</li>
            </ul>

            <h2 className='text-4xl font-semibold px-16 mt-48'>Please report any bugs to zoheballadin1@gmail.com</h2>
        </div>
    </div>
  )
}
