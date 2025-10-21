'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {  RegisterSchema, RegisterSchemaType } from '@/lib/schema'
import Link from 'next/link'
import React, { useState } from 'react'
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form"
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { set } from 'zod'
import { registerUser } from '@/lib/actions/auth'
//import { registerUser } from '@/lib/auth'
export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null);
  //const {data:session,update:updateSession} = useSession();
  const router = useRouter();
const form=useForm<RegisterSchemaType>({
resolver:zodResolver(RegisterSchema),
defaultValues:{
    name:"",
    email:"",
    password:"",
    confirmPassword:""

},
    })
const onSubmit= async (data:RegisterSchemaType)=>{
setError(null);
form.clearErrors();
try{
const result=await registerUser(data);
console.log(result);
if(!result.success){
 setError(result?.error || "An error occured while creating your account");
 return;
}
 router.push("/auth/signin");
}
catch(e) {
  console.error("Registration Error",e);
  setError("An error occured while creating your account");
}
}
  return (
<main className='flex min-h-screen flex-col items-center justify-center p-6'>
      <Card className='w-full max-w-md rounded-3xl shadow-2xl border border-gray-200 overflow-hidden'>
        <CardHeader className='text-center p-6'>
          <CardTitle className='text-3xl font-extrabold'>
            Create an Account
          </CardTitle>
          <CardDescription className='mt-2 text-sm'>
            or{' '}
            <Link href="/auth/signin" className='font-medium text-primary hover:underline'>
              sign in instead
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className='p-6'>
          {error &&(
            <p className='mb-4 text-sm text-destructive'>{error}</p>
          )}
            <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}className='space-y-6'>
            <FormField control={form.control} name="name" render={({field})=>(
                <FormItem>
                    <FormLabel>Name</FormLabel> 
                    <FormControl>
                      <Input   placeholder='Name' {...field} type="text"/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
                )}
            />
            <FormField control={form.control} name="email" render={({field})=>(
                <FormItem>
                    <FormLabel>Email</FormLabel> 
                    <FormControl>
                      <Input   placeholder='Email' {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
                )}
            />
             <FormField control={form.control} name="password" render={({field})=>(
                <FormItem>
                    <FormLabel>Password</FormLabel> 
                    <FormControl>
                      <Input   placeholder='Password' {...field} type='password'/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
                )}

            />
             <FormField control={form.control} name="confirmPassword" render={({field})=>(
                <FormItem>
                    <FormLabel>Confirm Password</FormLabel> 
                    <FormControl>
                      <Input   placeholder='Confirm Password' {...field} type='password'/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
                )}
                
            />
            {/* {session?.user && (
             <pre>{JSON.stringify(session,null,2)}</pre>
            )} */}
            <Button
              type='submit'
              className='w-full rounded-xl shadow-lg hover:shadow-xl transition-shadow bg-primary'
              disabled={form.formState.isSubmitting}
            >
              Sign Up
            </Button>
          </form>
          </Form>
          <div className='mt-4 text-center text-sm'>
            Forgot your password?{' '}
            <Link href="/forgot-password" className='font-medium text-primary hover:underline'>
              Reset it
            </Link>
          </div>
        </CardContent>
      </Card>
      {/* Optional decorative circles */}
      <div className='absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse'></div>
      <div className='absolute bottom-10 right-10 w-40 h-40 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse'></div>
    </main>
  )
}
