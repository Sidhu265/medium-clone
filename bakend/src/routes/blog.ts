import { Hono } from "hono";
import {PrismaClient} from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
    Variables: {
        userId: string;
    }
  }>();


blogRouter.use('/*', async(c,next)=>{
    const authHeader=c.req.header('Authorization')||"";
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if(user&&typeof user.id==='string'){
      c.set("userId",user.id);
      await next();
    }
    else{
      c.status(403);
      return c.json({ error: "You are not unauthorized"})
    }
})
    // const token = header.split(" ")[1]
    // const payload = await verify(token, c.env.JWT_SECRET)
    // if(!payload){
    //     c.status(401);
    //     return c.json({ error: "unauthorized"})
    // }
    // c.set('userId',payload.id);
    // await next()



blogRouter.post('/', async(c) => {
    
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const userId=c.get('userId');
    const blog = await prisma.post.create({
        data: {
             title: body.title,
             content: body.content,
             authorId: userId
        }
    })

    return c.json({
      id:blog.id
    }
    )
  })
  
  
blogRouter.put('/',async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

 const blog = await prisma.post.update({
    where:{
      id:body.id
    },
      data: {
           title: body.title,
           content: body.content
      }
  })
  return c.json({
    Updatedblog:blog
  }
  )
  
})

blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
}).$extends(withAccelerate())

const page = parseInt(c.req.query('page')|| '1'); // Default to page 1
const limit = parseInt(c.req.query('limit') || '3'); // Default to 10 items per page
const skip = (page - 1) * limit; // Calculate the number of items to skip

const blogs = await prisma.post.findMany({
  select:{
    title: true,
    content: true,
    id: true,
    author: {
      select:{
        name: true
      }
    }
  },
  // skip: skip,
  // take: limit
});

    return c.json({
      blogs
    })
  })
  
blogRouter.get('/:id', async(c) => {
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())
try{
 const blog = await prisma.post.findFirst({
    where:{
      id: c.req.param('id')
    }
  })
  return c.json({
    blog
  });
}
  catch(e){
    c.status(411);
    return c.json({
      message:"Error while fetching blog data"
    });
  }
})
  
