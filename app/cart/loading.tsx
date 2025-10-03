// import React from 'react'

// export default function Loading() {
//   return (
//      <main className="container mx-auto py-8 px-4">
//                 <div className="flex flex-col lg:flex-row gap-8 animate-pulse">
//                     {/* Skeleton for Cart Items */}
//                     <div className="flex-1 flex flex-col gap-4">
//                         {[1, 2, 3].map((i) => (
//                             <div key={i} className="h-24 rounded-lg w-full" />
//                         ))}
//                     </div>

//                     {/* Skeleton for Cart Summary */}
//                     <div className="w-full lg:w-96 h-6  rounded-xl" />
//                 </div>
//             </main>
//   )
// }

import React from 'react'
import { Card, CardHeader, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="container mx-auto py-8 px-4 flex flex-col lg:flex-row gap-8 animate-pulse">
      {/* Cart Items Skeleton */}
      <div className="flex-1 flex flex-col gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <div className="flex items-center gap-4 p-4">
              {/* Product image skeleton */}
              <Skeleton className="w-24 h-24 rounded-md" />
              {/* Product info skeleton */}
              <div className="flex-1 flex flex-col gap-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
            <CardFooter className="flex justify-between items-center px-4 pb-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-20" />
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Cart Summary Skeleton */}
      <div className="w-full lg:w-96">
        <Card className="p-6">
          <CardHeader>
            <Skeleton className="h-6 w-2/3 mb-4" />
          </CardHeader>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between items-center">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            ))}
          </div>
          <CardFooter className="mt-6">
            <Skeleton className="h-10 w-full rounded-md" />
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
