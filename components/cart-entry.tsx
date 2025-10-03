// "use client";
// import { CartItemWithProducts, setProductQuantity } from '@/lib/actions'
// import React, { useState } from 'react'
// import Image from 'next/image'
// import { formatPrice } from '@/lib/utils'
// import { Button } from './ui/button'
// import { Ghost, Minus, Plus, X } from 'lucide-react'
// interface CartEntryProps{
//     cartItem:CartItemWithProducts
// }
// export default function CartEntry({cartItem}:CartEntryProps) {
//     const [isLoading,setisLoading]=useState(false);

//     const handleSetProductQuantity=async (quantity:number) => {
//             setisLoading(true);
//         try{
//             await setProductQuantity(cartItem.product.id, quantity)
            
//         }catch(error){
//             console.error("Error incrementing cart item",error);
//         }finally{
//             setisLoading(false);
//         }

//     }
    
//   return (
//       <li className='border-b border-muted flex space-x-4 py-4 justify-between'>
//           <div className='flex space-x-4'>
//             <div className='absolute z-10 -ml-1 -mt-2'>
//                <Button variant="ghost" size="icon" disabled={isLoading} onClick={()=>handleSetProductQuantity(0)}
//                className='w-7 h-7 rounded-full bg-muted text-muted-foreground'>
//                 <X className='w-4 h-4'/>
//                 </Button> 
//             </div>
//             <div className='overflow-hidden rounded-md border border-muted w-16 h-16'>
//               <Image
//                   className="h-full w-full object-cover"
//                   width={128}
//                   height={128}
//                   src={cartItem.product.image || ''}
//                   alt={cartItem.product.name}>
//               </Image>
//           </div>
//           <div className='flex flex-col '>
//               <div className='font-medium'>{cartItem.product.name}</div>
//           </div>
//           </div>

//           <div className='flex flex-col justify-between items-end gap-2'>
//             <p className='font-medium'>{formatPrice(cartItem.product.price)}</p>
//             <div className='flex items-center border border-muted rounded-full'>
//                 <Button variant="ghost" className='rounded-l-full ' onClick={()=>handleSetProductQuantity(cartItem.quantity-1)} disabled={isLoading}>
//                     <Minus className='w-4 h-4'/>
//                 </Button>
//               <p className='w-6 text-center'>{cartItem.quantity}</p> 
//               <Button variant="ghost" className='rounded-r-full ' onClick={()=>handleSetProductQuantity(cartItem.quantity+1)} disabled={isLoading}>
//                     <Plus className='w-4 h-4'/>
//                 </Button> 
//             </div>
//             </div>
//       </li>
//   )
// }







"use client";
import { CartItemWithProducts, setProductQuantity } from "@/lib/actions";
import React, { useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Button } from "./ui/button";
import { Minus, Plus, X } from "lucide-react";

interface CartEntryProps {
  cartItem: CartItemWithProducts;
}

export default function CartEntry({ cartItem }: CartEntryProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSetProductQuantity = async (quantity: number) => {
    setIsLoading(true);
    try {
      await setProductQuantity(cartItem.product.id, quantity);
    } catch (error) {
      console.error("Error incrementing cart item", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <li
      className="
        rounded-2xl shadow-sm border border-muted
        p-4 sm:p-6 mb-4
        mx-4 sm:mx-0
        flex flex-col sm:flex-row sm:items-center justify-between gap-6
      "
    >
      {/* Left: Image & Product Info */}
      <div className="flex items-start sm:items-center gap-4 relative">
        {/* Remove Button - same place */}
        <div className="absolute -left-2 -top-2">
          <Button
            variant="ghost"
            size="icon"
            disabled={isLoading}
            onClick={() => handleSetProductQuantity(0)}
            className="w-7 h-7 rounded-full bg-muted text-muted-foreground hover:bg-muted/80"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Product Image */}
        <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg border border-muted">
          <Image
            className="object-cover w-full h-full"
            width={128}
            height={128}
            src={cartItem.product.image || ""}
            alt={cartItem.product.name}
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <span className="font-semibold text-base sm:text-lg">
            {cartItem.product.name}
          </span>
          <span className="text-sm text-muted-foreground">
            {formatPrice(cartItem.product.price)} each
          </span>
        </div>
      </div>

      {/* Right: Price & Quantity */}
      <div className="flex flex-row sm:flex-col justify-between sm:items-end w-full sm:w-auto gap-3 sm:gap-2">
        {/* Total Price */}
        <p className="font-bold text-base sm:text-lg">
          {formatPrice(cartItem.product.price * cartItem.quantity)}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center border border-muted rounded-full overflow-hidden shadow-sm">
          <Button
            variant="ghost"
            className="rounded-none px-3"
            onClick={() => handleSetProductQuantity(cartItem.quantity - 1)}
            disabled={isLoading || cartItem.quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="w-10 text-center font-medium">
            {cartItem.quantity}
          </span>
          <Button
            variant="ghost"
            className="rounded-none px-3"
            onClick={() => handleSetProductQuantity(cartItem.quantity + 1)}
            disabled={isLoading}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </li>
  );
}
