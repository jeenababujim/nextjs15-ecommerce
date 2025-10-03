import AddToCartButton from '@/components/add-to-cart-button';
import Breadcrumbs from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getProductBySlug } from '@/lib/actions';
import { formatPrice, sleep } from '@/lib/utils';
import { ShoppingCartIcon } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    if (!product) {
        return {
            title: 'Product Not Found',
            description: 'The requested product does not exist.',
        };
    }
    return {
        title: product.name,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            images: product.image ? [
                  {
                    url: product.image,
                    alt: product.name,
                }
            ] : undefined,
        },

    };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
       notFound();
    }
    
    const breadcrumbs = [
        
        { label: 'Products', href: '/' },
        { label: product.category.name, href: `/search/${product.category.slug}`},
        { label: product.name, href: `/product/${product.slug}`, active: true },
    ];
     await sleep(2000);
  return (
   <main className='container mx-auto py-4'>
    <Breadcrumbs items={breadcrumbs} />
    <Card className='max-w-3xl mx-auto'>
        <CardContent className='p-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
          
             <div className='relative rounded-lg overflow-hidden h-[200px] md:h-[400px]'>
              {product.image && ( 
                <Image src={product.image} 
                alt={product.name} 
                fill 
                priority
               sizes='(max-width: 768px) 100vw,50vw' 
               className='object-cover'
               />
              )}
            </div>
           
       <div>
            <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
       
        <div className='flex items-center gap-2 mb-4'>
            <span className='font-semibold text-lg'>{formatPrice(product.price)}</span>
        <Badge variant="outline">{product.category?.name}</Badge>
        </div>
        
        <Separator className="my-4" />
        <div className='space-y-2'>
            <h2 className='font-medium'>Description</h2>
            <p>{product.description}</p>
        </div>
        <Separator className="my-4" />
        <div className='space-y-2'>
            <h2 className='font-medium'>Availability</h2>
            <div className='flex items-center gap-2'>
            {product.inventory > 0 ? (
                <Badge variant="outline" className='bg-green-100 text-green-800'>In Stock</Badge>
            ) : (
                <Badge variant="outline" className='bg-red-100 text-red-800'>Out of Stock </Badge>
            )}
            {product.inventory>0 && (
                <span className='text-xs text-gray-600'>Hurry, only {product.inventory} left!</span>
            )}
        </div>
        </div>
        <Separator className="my-4" />
        {/* <div>
            <Button disabled={product.inventory === 0} className='w-full'>
            <ShoppingCartIcon className='mr-1 w-4 h-4'/>
            {product.inventory > 0 ? 'Add to Cart' : 'Out of Stock'}
            </Button>
        </div> */}
        <AddToCartButton product={product} />
        </div>
        </CardContent>
    </Card>
    
    
   </main>
  )
}
