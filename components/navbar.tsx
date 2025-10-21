import Link from 'next/link'
import React, { Suspense } from 'react'
import { Button } from './ui/button'
import {  Search, ShoppingCart } from 'lucide-react'
import { ModeToggle } from './mode-toggle'
import MobileNav from './mobile-nav'
import Menu from './menu'
import SearchInput from './search-input'
import CartIndicator from './cart-indicator'
import CartIndicatorSkeleton from './cart-indicator-skelton'
import AuthStatus from './auth-status'
export const categories=[{id:1,name:'Electronics',slug:'electronics',href:'/search/electronics'},
{id:2,name:'Clothing',slug:'clothing',href:'/search/clothing'},
{id:3,name:'Home',slug:'home',href:'/search/home'},

]

export default function Navbar() {
  return (
    <div className='border-b'>
     <div className='container mx-auto py-4 h-16 flex justify-between items-center'>
      <div>
      <div className='flex items-center gap-6'>
            <Link href='/' className='text-2xl font-bold hidden md:block'>MyStore</Link>
            <nav className='hidden md:flex items-center gap-6'>
                {categories.map((category)=>(
                    <Link key={category.id} href={category.href} 
                    className='text-muted-foreground 
                    hover:text-primary 
                    transition-colors 
                     text-sm font-medium'>
                    {category.name}
                    </Link>
                ))}
            </nav>
            <MobileNav />
        </div>
        </div>
        <div className='hidden md:block w-full mx-4 md:mx-8'>
        <SearchInput />
        </div>
        <div className='flex items-center gap-0'>
        <AuthStatus/>
       
        {/* <Button variant='ghost' size='icon' asChild>
            <Link href='/cart'>
                <ShoppingCart className='h-5 w-5'/>
            </Link>
        </Button> */}
        
        <Suspense fallback={<CartIndicatorSkeleton/>}>
        <CartIndicator />
        </Suspense>
      

        <ModeToggle />
       

        </div>
       
     </div>

    </div>
  )
}
