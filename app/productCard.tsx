// import { Product } from '@/lib/mocks'
// "use client"
import React from 'react'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import { Product } from './generated/prisma/client'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
// import { getProductBySlug } from '@/lib/actions'
export default function ProductCard({product}: {product:Product}) {
  return (
    <Card className='pt-0 overflow-hidden' 
    // onClick={async () => console.log(await getProductBySlug(product.slug))}
    >
    {/* <img src={product.image} alt={product.name} className="w-full h-75 object-cover object-center mb-4" /> */}
    <div className="relative aspect-video ">
      {product.image && (
        <Image
          src={product.image}
          alt={product.name}
          className="object-cover"
          fill
          sizes={"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          //  priority
          loading='lazy'
          quality={75}
        />
      )}
  </div>
  <CardHeader>
    <CardTitle>{product.name}</CardTitle>
    <CardDescription>{product.description}</CardDescription>
  </CardHeader>
  <CardFooter>
    <p>{formatPrice(product.price)}</p>
  </CardFooter>
    </Card>
  )
}
