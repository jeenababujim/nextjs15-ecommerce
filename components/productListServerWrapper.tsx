import { GetProductParams, getProducts } from '@/lib/actions'
import React from 'react'
import { ProductsList } from './product-list'

interface ProductListServerWrapperProps{
    params: GetProductParams
}
export default async function ProductListServerWrapper({params}: ProductListServerWrapperProps) {
    const products=await getProducts(params)
  return (
   <ProductsList  products={products} />
  )
}
