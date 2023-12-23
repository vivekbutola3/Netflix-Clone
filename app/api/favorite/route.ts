import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

 async function handler(req: Request, res: Response) {
  try {
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req, res);

      const { movieId } =await req.json();
  
      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        }
      });
  
      if (!existingMovie) {
        throw new Error('Invalid ID');
      }
  
      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          favoriteIds: {
            push: movieId
          }
        }
      });
  
      return Response.json(user);
    }

    if (req.method === 'DELETE') {
      const { currentUser } = await serverAuth(req, res);

      const { movieId } = await req.json();

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        }
      });

      if (!existingMovie) {
        throw new Error('Invalid ID');
      }

      const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        }
      });

      return Response.json(updatedUser);
    }
    
      return new Response('Error', {
        status:405
    })
  } catch (error) {
    console.log(error);

    return new Response('Error', {
        status:500
    })
  }
}
export { handler as GET, handler as POST,handler as DELETE };