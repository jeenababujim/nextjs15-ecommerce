import {  ShoppingCart } from 'lucide-react'
import React from 'react'

import { getCart } from '@/lib/actions'
import Link from 'next/link';
import { Button } from './ui/button';

export default async function CartIndicator() {
    const cart=await getCart();
    const cartSize=cart?.size?? 0;
  return (

    
        <Button variant='ghost' size='icon' asChild className='relative'>
            <Link href='/cart'>
             <ShoppingCart className='h-6 w-6' />
            {cartSize > 0 &&(
//  <span className='absolute top-0 rigt-0 flex h-3 w-3 items-center justify-center rounded-full bg-red-500
// text-xs text-white'>{cartSize}</span> 
<span className="absolute -top-0.5 -right-0.5 flex min-w-[14px] h-[14px] items-center justify-center rounded-full bg-red-500 px-[2px] text-[9px] font-medium text-white leading-none">
  {cartSize}
</span>

        
            )
            }
            </Link>
        </Button>
    
  )
}
