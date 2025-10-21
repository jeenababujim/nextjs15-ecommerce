// import { getCart } from '@/lib/actions'
// import { formatPrice } from '@/lib/utils'
// import { get } from 'http'
// import React from 'react'
// import { Button } from './ui/button'
// import Link from 'next/link'

// export default async function CartSummary() {
//     const cart=await getCart()
//     if(!cart) {
//         return null
//     }
//     const subtotal=cart.subtotal;
//     console.log("subtotal", cart)
//     const taxes=0;
//     const shipping=0;
//     const total=subtotal+taxes+shipping;
//   return (
//     <div className='flex flex-col pt-4'>
//       <div className='text-sm text-muted-foreground'>
//         <div className='flex items-center justify-between border-b pb-1 mb-3'>
//            <p>SubTotal</p> 
//            <p className='text-base text-foreground'>{formatPrice(subtotal)}</p>
//         </div>
//         <div className='flex items-center justify-between border-b pb-1 mb-3'>
//            <p>Taxes</p> 
//            <p >Calculated at checkout</p>
//         </div>
//         <div className='flex items-center justify-between border-b pb-1 mb-3'>
//            <p>Shipping</p> 
//            <p >Calculated at checkout</p>
//         </div>
//          <div className='flex items-center justify-between border-b pb-1 mb-3 font-semibold'>
//            <p>Total</p> 
//            <p >{formatPrice(total)}</p>
//         </div>
//       </div>
//       <Button size="lg" asChild className='mt-4 w-full'>
//         <Link href='/checkout'>Proceed to checkout
//         </Link>
//       </Button>
//     </div>
//   )
// }


import { getCart } from '@/lib/actions'
import { formatPrice } from '@/lib/utils'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

export default async function CartSummary() {
    const cart = await getCart()
    if (!cart) {
        return null
    }

    const subtotal = cart.subtotal
    const taxes = 0
    const shipping = 0
    const total = subtotal + taxes + shipping

    return (
        <div className="flex flex-col p-6 rounded-xl shadow-md ">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="text-sm  space-y-3">
                <div className="flex items-center text-muted-foreground justify-between border-b pb-2">
                    <p>Subtotal</p>
                    <p className=" font-medium">{formatPrice(subtotal)}</p>
                </div>

                <div className="flex items-center text-muted-foreground justify-between border-b pb-2">
                    <p>Taxes</p>
                    <p >Calculated at checkout</p>
                </div>

                <div className="flex items-center text-muted-foreground justify-between border-b pb-2">
                    <p>Shipping</p>
                    <p >Calculated at checkout</p>
                </div>

                <div className="flex items-center justify-between border-b pb-2 ">
                    <p className='font-bold text-base sm:text-lg'>Total</p>
                    <p className='font-bold text-base sm:text-lg'>{formatPrice(total)}</p>
                </div>
            </div>

           
        </div>
    )
}
