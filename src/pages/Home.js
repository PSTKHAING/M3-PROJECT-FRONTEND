import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='flex flex-col gap-4 justify-center items-center'>
            <Link className='px-6 w-52 text-center py-4 bg-red-500 text-white rounded-md uppercase font-semibold border-2 border-solid border-red-500 hover:bg-transparent hover:text-red-500 transition-all duration-300 ease-in-out' to='/categories'>category crud</Link>
            <Link className='px-6 w-52 text-center py-4 bg-red-500 text-white rounded-md uppercase font-semibold border-2 border-solid border-red-500 hover:bg-transparent hover:text-red-500 transition-all duration-300 ease-in-out' to='/products'>product crud</Link>
        </div>
    )
}

export default Home