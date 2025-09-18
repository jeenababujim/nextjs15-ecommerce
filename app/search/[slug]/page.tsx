
import Breadcrumbs from '@/components/breadcrumbs';
import { prisma } from '@/lib/prisma';
import { sleep } from '@/lib/utils';

import React, { Suspense } from 'react'
import ProductCard from '../../productCard';
import { Prisma, Product } from '../../generated/prisma/client';
import ProductSkeleton from '@/components/productSkeleton';
type categoryPageProps={
    params:Promise<{slug:string}>    
}
async function Products({slug}: { slug: string }) {
    const products = await prisma.product.findMany({
where:{
category:{
    slug
}
},
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

export default async function CategoryPage({params}: categoryPageProps) {
  const slug = await params;
  const category=await prisma.category.findUnique({
    where:{slug:slug?.slug},
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
<Suspense key={slug.slug} fallback={<ProductSkeleton/>}>
<Products slug={slug.slug} />
</Suspense>
    </main>
  )
}