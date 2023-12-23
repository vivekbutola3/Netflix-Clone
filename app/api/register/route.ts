import bcrypt from 'bcrypt';

import client from '@/lib/prismadb';


export async function POST(req: Request): Promise<Response>  {
  try {
    if (req.method !== 'POST') {
      return new Response('Error',{status:405});
    }

    const { email, name, password } = await req.json();
 

  const existingUser = await client.user.findUnique({
    where: {
      email,
    },
  });
    if (existingUser) {
      return new Response('Email taken',{status:422 } );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await client.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: '',
        emailVerified: new Date(),
      }
    })

    return new Response(`${user}`,{status:200});
  } catch (error) {
    return new Response( `Something went wrong: ${error}`,{status:400}); 
  }
}