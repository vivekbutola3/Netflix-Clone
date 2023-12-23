
import useSWR from 'swr'
import fetcher from '@/lib/fetcher';

 export function useMovieList(){
  const { data, error, isLoading, mutate } = useSWR('/api/movies', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect:false
});
  return {
    data,
    error,
    isLoading,
    mutate,
  }
};

