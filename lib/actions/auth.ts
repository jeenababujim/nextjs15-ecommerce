"use server";

import z from "zod";
import { hashPassword } from "../auth";
//import { prisma } from "../prisma";
import { RegisterSchema, RegisterSchemaType } from "../schema";
import { prisma } from "../prisma";

export async function registerUser(data:RegisterSchemaType){
 const validationResult=RegisterSchema.safeParse(data);
        if(!validationResult.success){
    const tree = z.treeifyError(validationResult.error);
          return {
            success: false,
            error:"Invalid data provided",
            issues:tree
          };
        }
         const{email,password,name} = validationResult.data;
         try{
            const existingUser=await prisma.user.findUnique({
             where:{email}
               })
               if(existingUser){
                return{
                  success: false,
                  error:"An account with email already exists"
                }
               }
               const hashedPassword=await hashPassword(password);
               const newUser=await prisma.user.create({
                data:{
                  email,
                  password:hashedPassword,
                  name:name || null,
                  role:"user",
                
                }
               });
               const userWithoutPassword={
                id:newUser.id,
                email:newUser.email,
                name:newUser.name,
                role:newUser.role,

               }
               return{
                success:true,
                user:userWithoutPassword
               }
         }catch(e){
          console.error("Registration server action error",e);
          return{
                success:false,
                error:"Could not create account.Please try again later"
               }
         }
       
}