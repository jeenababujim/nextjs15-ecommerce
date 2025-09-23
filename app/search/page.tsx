
import Breadcrumbs from '@/components/breadcrumbs';
import { prisma } from '@/lib/prisma';

import React, { Suspense } from 'react'
import ProductCard from '../productCard';
import {  Product } from '../generated/prisma/client';
import ProductSkeleton from '@/components/productSkeleton';
import ProductListServerWrapper from '@/components/productListServerWrapper';
type searchPageProps={
    searchParams:Promise<{query?:string | undefined,sort?:string }> ;
       
}
// async function Products({query,sort}: { query: string,sort?:string }) {
//  let orderBy: Record<string, "asc" | "desc">| undefined ;
//  if( sort==='price_asc'){
// orderBy={price:"asc"}
//  }else if(sort=== 'price_desc'){
// orderBy={price:"desc"}
//  }

//     const products = await prisma.product.findMany({
// where:{
// OR: [
//   { name: { contains: query, mode: 'insensitive' } },
//   { description: { contains: query, mode: 'insensitive' } }
// ]
// },
//   ...(orderBy ? { orderBy } : {}),
// take:18,
//   });
//   //await sleep(2000);
//   console.log(products);
// if(products.length===0){
//   return <div className='text-center text-muted-foreground'>No products found</div>
// }
//  return(
//    <>

//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"> 
//         {products.map((product: Product) => (
//           <ProductCard key={product.id} product={product} />
//         ))} 
//       </div>
//   </>
//  )
//   //return products;
// }

export default async function SearchPage({searchParams}: searchPageProps) {
  const params = await searchParams;
  const query = params.query?.trim() ?? "";
  const sort=params?.sort ?? "";
  const breadcrumbs = [
    { label: 'Products', href: '/' },
    { label: `Results for query "${query}"`, href: `/search?query=${encodeURIComponent(query)}`, active: true }
  ];

  return (
    <>
        <Breadcrumbs items={breadcrumbs} />
      <Suspense key={`${query}-${sort}`}  fallback={<ProductSkeleton/>}>
      {/* <Products query={query} sort={sort}/> */}
      <ProductListServerWrapper params={{query, sort}}/>
     </Suspense>
    </>
  )
}