// import { Product } from '@/lib/mocks'
import React from 'react'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import { Product } from './generated/prisma/client'
export default function ProductCard({product}: {product:Product}) {
  return (
    <div className="border border-gray-400 p-4 rounded-lg shadow-md">
    {/* <img src={product.image} alt={product.name} className="w-full h-75 object-cover object-center mb-4" /> */}
    <div className="relative aspect-video w-full h-75 mb-4">
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
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
      {/* <p className="text-lg font-semibold">{formatPrice(product.price)}</p> */}
      <p className="text-lg font-semibold">{formatPrice(product.price)}</p>

    </div>
  )
}
