"use client"
import { Product } from '@/app/generated/prisma'
import React from 'react'
import { ShoppingCartIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addToCart } from '@/lib/actions';
export default function AddToCartButton({product}:{product:Product}) {
    const[isAdding, setIsAdding] = React.useState(false);
    const handleAddToCart= async ()=>{
        try{
            setIsAdding(true);
            await addToCart(product.id,1)
        }catch (error) {
             console.error("Error adding to the cart",error)
        }finally{
            setIsAdding(false);
        }
    }
  return (
    <div>
        <Button onClick={handleAddToCart}
        disabled={product.inventory === 0 || isAdding} className='w-full'>
        <ShoppingCartIcon className='mr-1 w-4 h-4'/>
        {product.inventory > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
    </div>
  )
}
