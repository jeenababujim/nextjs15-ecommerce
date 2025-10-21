"use client";
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';
import { LogIn, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Session } from 'inspector/promises';

export default function AuthStatus() {
    const {status,data:session}=useSession();
if(status === 'loading'){
    return <Skeleton className='w-9 h-9'/>
}

if(status === "unauthenticated"){
return <Button variant="ghost" size="icon" asChild>
<Link href='/auth/signin'>
<LogIn className="h-5 w-5"/>
</Link>
</Button>
}
return(
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
    <Button variant='ghost' size='icon' >
     <User className='w-5 h-5'/>   
    </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
    <DropdownMenuLabel>
      {session?.user?.name}
    </DropdownMenuLabel>
    <DropdownMenuItem asChild>
   <Link href="/account">My Account</Link>
    </DropdownMenuItem>
    <DropdownMenuSeparator/>
    <DropdownMenuItem onClick={()=>signOut()}>
    {/* <LogOut className='w-5 h-5'/>  */}
    Sign out
    </DropdownMenuItem>
    </DropdownMenuContent>
    </DropdownMenu>
)

}