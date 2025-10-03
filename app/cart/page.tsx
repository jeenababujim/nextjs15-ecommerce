// import CartEntry from '@/components/cart-entry'
// import CartSummary from '@/components/cart-summary'
// import { getCart } from '@/lib/actions'
// import React from 'react'
// export default async function CartPage() {
//     const cart=await getCart()
//   return (
//     <main className='container mx-auto py-4'>
// {!cart || cart.items.length === 0 ? (
// <div className='text-center'>
//    <h2 className='text-2xl'>Your cart is empty</h2> 
//    <p className='text-gray-500'>
// Add some items to your cart to get started.
//    </p>
// </div>
// ): (
//  <>
//     <div className='flex flex-col gap-4'>
//         {
//             cart && cart.items.map((item)=>(
//                 <CartEntry key={item.id} cartItem={item} />
//             ))
//         }
//     </div>
// <CartSummary/>
//     </>
// )}
//     </main>
//   )
// }

import CartEntry from '@/components/cart-entry'
import CartSummary from '@/components/cart-summary'
import { getCart } from '@/lib/actions'
import { sleep } from '@/lib/utils'
import React from 'react'

export default async function CartPage() {
    await sleep(3000)
    const cart = await getCart()

    return (
        <main className="container mx-auto py-8 px-4">
            {!cart || cart.items.length === 0 ? (
                <div className="text-center py-20">
                    <h2 className="text-3xl font-semibold mb-4">Your cart is empty</h2>
                    <p className="text-gray-500 text-lg">
                        Add some items to your cart to get started.
                    </p>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="flex-1 flex flex-col gap-4">
                        {cart.items.map((item) => (
                            <CartEntry key={item.id} cartItem={item} />
                        ))}
                    </div>

                    {/* Cart Summary */}
                    <div className="w-full lg:w-96">
                        <CartSummary />
                    </div>
                </div>
            )}
        </main>
    )
}
