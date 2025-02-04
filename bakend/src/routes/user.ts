import { Hono } from "hono";
import {PrismaClient} from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signupInput,signinInput } from "../zod";


export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
      
    }
  }>();

userRouter.post('/signup', async(c) => {
  const body = await c.req.json();
  const {success} = signupInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message: "Inputs not correct"
    })
  }
    try{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())
  
   const user = await prisma.user.create({
    data: {
      email: body.username,
      password: body.password,
    },
   })
  
    const token = await sign({id: user.id},c.env.JWT_SECRET)
  
  
    return c.json({
      jwt: token})
    }
  
      catch (error) {
        console.error(error); // Log the error for debugging
        return c.json({ error: 'Internal Server Error' }, 500);
      }
    });
  
  
  
  userRouter.post('/signin', async(c) => {
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body);
    if(!success){
    c.status(411);
    return c.json({
      message: "Inputs not correct"
    })
  }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())
  
  
   
   const user= await prisma.user.findFirst({
    where: {
      email: body.email,
      password: body.password,
    }
   });
  
   if(!user){
    c.status(403);//unauthorized
    return c.json({
      msg: "Incorrect Credentials"
    });
    }
  
  
    const jwt = await sign({ id: user.id}, c.env.JWT_SECRET);
    return c.json({token: jwt});
  })
  