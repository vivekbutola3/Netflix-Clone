"use client";
import React from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from 'next/navigation';
import useMovie from '@/hooks/useMovie';
import { useSearchParams } from 'next/navigation';

const Watch = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const movieId = searchParams.get('movieId');

  const { data } = useMovie(movieId as string);
  
  return (
    <div className="h-screen w-screen bg-black">
    <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
      <IoIosArrowBack onClick={() => router.push('/')} className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition" />
      <p className="text-white text-1xl md:text-3xl font-bold">
        <span className="font-light">Watching:</span> {data?.title}
      </p>
    </nav>
    <video className="h-full w-full" autoPlay controls src={data?.videoUrl}></video>
  </div>
  )
}

export default Watch;
