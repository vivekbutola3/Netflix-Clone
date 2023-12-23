"use client";
import React, { useEffect } from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import {useCurrentUser} from '@/hooks/useCurrentUser';

import { useRouter } from 'next/navigation';
import Navbar from '@/Components/Navbar';
import Billboard from '@/Components/Billboard';
import MovieList from '@/Components/MovieList';

import InfoModal from '@/Components/InfoModal';
import {useMovieList} from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import useInfoModalStore from '@/hooks/useInfoModelStore';

export function AuthCheck(){
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      
      if (!session) {
        router.push('/auth');
      }
    };

    checkSession();
  }, []);
  return {
    props: {
      
    }
  }
}

const Home = () => {
  AuthCheck();
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const {isOpen, closeModal} = useInfoModalStore();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
    
      
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
        <p className='bg-white text-center'></p>
      </div>
    </>
  )
}

export default Home;
