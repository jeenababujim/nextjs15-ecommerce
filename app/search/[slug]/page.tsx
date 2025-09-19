
import Breadcrumbs from '@/components/breadcrumbs';
import { prisma } from '@/lib/prisma';
import { sleep } from '@/lib/utils';

import React, { Suspense } from 'react'
import ProductCard from '../../productCard';
import { Prisma, Product } from '../../generated/prisma/client';
import ProductSkeleton from '@/components/productSkeleton';
import Link from 'next/link';
type categoryPageProps={
    params:Promise<{slug:string}>    
    searchParams:Promise<{sort:string}>
}
async function Products({slug,sort}: { slug: string, sort: string }) {
  let orderBy: Record<string, "asc" | "desc"> | undefined;
  if(sort=="price_asc"){
    orderBy={price:"asc"}
  }
  else if(sort=="price_desc"){
    orderBy={price:"desc"}
  } 

    const products = await prisma.product.findMany({
where:{
category:{
    slug
}
},
...(orderBy?{orderBy}:{}),
take:18
  });
  //await sleep(2000);
  console.log(products);
if(products.length===0){
  return <div className='text-center text-muted-foreground'>No products found</div>
}
 return(
   <>
 
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"> 
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))} 
      </div>
  </>
 )
  //return products;
}

export default async function CategoryPage({params,searchParams}: categoryPageProps) {
  const {slug} = await params;
  const {sort} = await searchParams;
  const category=await prisma.category.findUnique({
    where:{slug:slug},
    select:{
        name:true,
        slug:true

    }
  })
//   const slug = category?.name ?? "";
  const breadcrumbs = [
    { label: 'Products', href: '/' },
    { label: category?.name ?? '', href: `/search${category?.slug ? `/${category.slug}` : ''}`, active: true }
  ];

  return (
    <main className='container mx-auto py-4'>
        <Breadcrumbs items={breadcrumbs} />
        <div className='flex gap-3 text-sm mb-8'>
<Link href={`/search/${slug}?sort=latest`} className={sort==="latest"?"font-bold":"font-normal"}>Latest</Link>
<Link href={`/search/${slug}?sort=price_asc`} className={sort==="price_asc"?"font-bold":"font-normal"}>Price Low to High</Link>
<Link href={`/search/${slug}?sort=price_desc`} className={sort==="price_desc"?"font-bold":"font-normal"}>Price High to Low</Link>
        </div>
<Suspense key={`search-${slug}-${sort}`} fallback={<ProductSkeleton/>}>
<Products slug={slug} sort={sort} />
</Suspense>
    </main>
  )
}