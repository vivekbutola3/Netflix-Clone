import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export async function GET(req: Request, res: Response) {
  try {
    if (req.method !== 'GET') {
      return new Response('Error',{status:405})
    }

    await serverAuth(req, res);

    const moviesCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * moviesCount);

    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex
    });

      return Response.json(randomMovies[0]);
  } catch (error) {
    console.log(error);

    return new Response('Error',{status:500})
  }
}
