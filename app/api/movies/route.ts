
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export async function GET(req: Request, res: Response) {
  try {
    if (req.method !== 'GET') {
        return new Response('Error', {
         status:405
     })
    }

    await serverAuth(req, res);

    const movies = await prismadb.movie.findMany();

      return Response.json(movies);
  } catch (error) {
    console.log({ error })
    return new Response('Error', {
        status:500
    })
  }
}
