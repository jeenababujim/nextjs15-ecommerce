import {z} from "zod"

export const LoginSchema=z.object({
    email: z.email({
        message:"please enthe a valid email address"
    }),
    password:z.string().min(8, {
        message:"Please enter a password"
    })
})
export type LoginSchemaType=z.infer<typeof LoginSchema>

export const RegisterSchema=z.object({
     name: z.string().min(2,{
        message:"please enthe a valid name"
    }),
    email: z.email({
        message:"please enthe a valid email address"
    }),
    password:z.string().min(8, {
        message:"Password must be atleast 8 characters long"
    }),
     confirmPassword:z.string().min(8, {
        message:"Password must be atleast 8 characters long"
    })
    
}).refine((data)=> data.password === data.confirmPassword,{
message:"Password does not match",
path:["confirmPassword"]
})
export type RegisterSchemaType=z.infer<typeof RegisterSchema>




