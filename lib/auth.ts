import bcrypt from "bcryptjs";
// import NextAuth from "next-auth"
import NextAuth, { Session, User } from "next-auth";
import { JWT  } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials"
;
import { LoginSchema, RegisterSchema, RegisterSchemaType } from "./schema";
//import { prisma } from "./prisma";
import z from "zod";
import { error } from "console";
import { id } from "zod/v4/locales";
import { prisma } from "./prisma";

declare module "next-auth" {
  interface User {
    id:string ;
    name:string | null ;
    email:string | null;
    role:string | null;
  }

  interface Session {
    user:{
    id:string ;
    name:string | null ;
    email:string | null;
    role:string | null;
    image:string | null;
    },
    refreshedAt?:string | null,
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id:string ;
    name:string | null ;
    email:string | null;
    role:string | null;
  }
}
export const {  handlers, signIn, signOut, auth} = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label:"Email",type:"email" },
        password: {label:"Password",type:"password" },
      },
      async authorize(credentials) {
        const parsedCredentials=LoginSchema.safeParse(credentials);
        if(!parsedCredentials.success){
          console.log("invalid credential format");
          return null;
        }
         const { email, password } = parsedCredentials.data;
        try{
          const user=await prisma.user.findUnique({
            where:{email}
          })
          if(!user){
           console.log("No user found with this email");
           return null;
          }
          const passwordMatch=await comparePasswords(password,user.password);
          if(!passwordMatch){
            console.log("Password does not match");
            return null;
          }
          return {
            id : user.id,
            name : user.name,
            email : user.email,
            role : user.role,
          }
        }catch(error){
         console.error("Error finding user",error);
         return null;
        }
      },
    }),
  ],
  callbacks: {
   async jwt({token,user}:{token:JWT,user:User}){
   if(user){
    token.id=user.id;
    token.role=user.role;
   
  }
  return token;
},

 async session({ session, token }: { session: Session; token: JWT }) {
  if (session.user) {
    session.user.id = token.id ;
    session.user.role = token.role ;
  }
  return session;
},


  },

 
   pages: {
    signIn:"/auth/signin"
  }
})


export async function hashPassword(password:string){
    const saltRounds=10;
    return await bcrypt.hash(password, saltRounds);

}
export async function comparePasswords(
    password: string,
    hashedPassword: string
) 
{
    return bcrypt.compare(password,hashedPassword)
}

