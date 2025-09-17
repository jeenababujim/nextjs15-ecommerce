

import BreadcrumbSkeleton from '@/components/breadcrumbSkelton';
import ProductSkeleton from '@/components/productSkeleton';
import React from 'react'
export default async function Loading() {
  return (
<main className='container mx-auto py-4'>
 <BreadcrumbSkeleton />
 <ProductSkeleton  />
   </main>
  )
}
