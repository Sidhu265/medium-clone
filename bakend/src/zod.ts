import z from 'zod';

export const signupInput = z.object({
    username: z.string().email({message:"Invalid email"}),
    password: z.string().min(8).regex(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),{message:'Must be a Valid Password'}),   
    name: z.string().optional()                                                     
})



export const signinInput = z.object({
    username: z.string().email({message:"Invalid email"}),
    password: z.string().min(8).regex(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),{message:'Must be a Valid Password'}),                                                      
})



export const createBlogInput = z.object({
    title: z.string(),
    content: z.string(),
})


export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.number()
})

export type SignupInput = z.infer<typeof signupInput>

export type SigninInput = z.infer<typeof signinInput>


export type CreateblogInput = z.infer<typeof createBlogInput>

export type UpdateblogInput = z.infer<typeof updateBlogInput>

