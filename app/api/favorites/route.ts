import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export async function GET(req: Request, res: Response) {
  try {
    if (req.method !== 'GET') {
        return new Response('Error', {
          status:405
      })
    }

    const { currentUser } = await serverAuth(req, res);

    const favoritedMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        }
      }
    });

    return Response.json(favoritedMovies)
  } catch (error) {
    console.log(error);
    return new Response('Error', {
        status:500
    })
  }
}
