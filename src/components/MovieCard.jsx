import React from 'react'
import Link from 'next/link'
import { FiStar } from 'react-icons/fi'

export default function MovieCard({ movie }) {
    return (
        <article className='group min-w-0 flex flex-col lg:min-w-50'>
            <Link href={`/movie/${movie.id}`}>
                <div className='relative aspect-2/3 overflow-hidden rounded-xl bg-[#1b1920]'>
                    <img src={movie.poster} alt={movie.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <div className='absolute right-2 top-2 flex items-center justify-center gap-1 rounded-full bg-black/30 backdrop-blur-xs px-2 py-1 text-xs lg:text-sm text-white'>
                        <FiStar className='fill-yellow-400 text-yellow-400' size={15} /> {movie.rating}
                    </div>
                </div>
                <div className='mt-3'>
                    <h3 className='truncate lg:text-sm md:text-xl sm:text-2xl font-md text-white'>{movie.title}</h3>
                    <div className='flex justify-between text-md'>
                        <span className='text-red-500'>{movie.year}</span>
                        <span>{movie.genre}</span>
                    </div>
                </div>
            </Link>
        </article>
    )
}
