import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";

export async function GET(req: Request, res: Response) {
  try {
    if (req.method !== 'GET') {
      return new Response('Error',{status:405})
    }

    const { currentUser } = await serverAuth(req, res);
    console.log(currentUser);
    return Response.json(currentUser);
  } catch (error) {
    console.log(error);
    return new Response('Error',{status:500})
  }
}
