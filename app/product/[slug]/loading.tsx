
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'
export default async function Loading() {
   

    
  return (
   <main className='container mx-auto p-4'>
    <Card className='max-w-3xl mx-auto'>
        <CardContent className='p-6'>
          <Skeleton className="h-10 w-3/4 mb-6" />
        {/* {product.image && (
            <img src={product.image} alt={product.name} className="w-full h-full object-cover object-center" />
        )} */}
        <div className='flex items-center gap-2 mb-4'>
            <Skeleton className="h-6 w-24 mb-6" />
            <Skeleton className="h-6 w-32 mb-6" />
        </div>
        
        <Separator className="my-4" />
        <div className='space-y-2'>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
        </div>
        </CardContent>
    </Card>
    
    
   </main>
  )
}
