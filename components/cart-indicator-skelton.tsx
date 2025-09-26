import {  ShoppingCart } from 'lucide-react'
import React from 'react'

import { getCart } from '@/lib/actions'
import Link from 'next/link';
import { Button } from './ui/button';

export default async function CartIndicatorSkeleton() {
    const cart=await getCart();
    const cartSize=cart?.size?? 0;
  return (

    
        <Button variant='ghost' size='icon' asChild className='relative' disabled>
            <Link href='/cart'>
             <ShoppingCart className='h-6 w-6' />
            
            </Link>
        </Button>
    
  )
}
