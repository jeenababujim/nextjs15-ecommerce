'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { LoginSchema, LoginSchemaType } from '@/lib/schema'
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
export default function SignInPage() {
  const [error, setError] = useState<string | null>(null);
  const {data:session,update:updateSession} = useSession();
  const router = useRouter();
const form=useForm<LoginSchemaType>({
resolver:zodResolver(LoginSchema),
defaultValues:{
    email:"",
    password:"",
},
    })
const onSubmit= async (data:LoginSchemaType)=>{
setError(null);
    try{
    const result= await signIn("credentials",{
email:data.email,
password:data.password,
redirect:false
    })
    if(result.error){
      if(result.error === "CredentialsSignin"){
         setError("Invalid email or password");
      }else{
         setError("An error occured while signing in")
      }
    }else{
      await updateSession();
      router.push("/");
    }
  }catch(error){
    console.error("Sign in error",error);
   setError("An error occured while signing in");
  }
}
  return (
<main className='flex min-h-screen flex-col items-center justify-center p-6'>
      <Card className='w-full max-w-md rounded-3xl shadow-2xl border border-gray-200 overflow-hidden'>
        <CardHeader className='text-center p-6'>
          <CardTitle className='text-3xl font-extrabold'>
            Sign In
          </CardTitle>
          <CardDescription className='mt-2 text-sm'>
            or{' '}
            <Link href="/auth/signup" className='font-medium text-primary hover:underline'>
              create an account
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className='p-6'>
          {error &&(
            <p className='mb-4 text-sm text-destructive'>{error}</p>
          )}
            <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}className='space-y-6'>
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
            {session?.user && (
             <pre>{JSON.stringify(session,null,2)}</pre>
            )}
            <Button
              type='submit'
              className='w-full rounded-xl shadow-lg hover:shadow-xl transition-shadow bg-primary'
              disabled={form.formState.isSubmitting}
            >
              Sign In
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
