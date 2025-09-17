import React from 'react'
import ProductSkeleton from './productSkeleton'

export default function Loading() {
  return (
    // <div className="flex items-center justify-center h-screen">
    //   <div className="w-20 h-20 border-t-2 border-b-2 rounded-full animate-spin
    //    border-gray-800">
    //    <span className="sr-only">Loading...</span>
    //    </div>
    // </div>
     <main className="container mx-auto py-4">
        
          <p>showing 5 products</p>
          <ProductSkeleton/>
        </main>
  )
}
