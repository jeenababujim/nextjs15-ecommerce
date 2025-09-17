
import Breadcrumbs from '@/components/breadcrumbs';
import { prisma } from '@/lib/prisma';
import { sleep } from '@/lib/utils';

import React from 'react'
type searchPageProps={
    searchParams:Promise<{query:string}> | undefined    
}
// breadcrumbs will be constructed inside the SearchPage function using the resolved query

// async function Products({query}: { query: string }) {
 
//     const products = await prisma.product.findMany({
    
//     orderBy: {id: 'asc'}
//   });
//   await sleep(2000);
// }


export default async function SearchPage({searchParams}: searchPageProps) {
  const params = await searchParams;
  const query = params?.query.trim() || '';
  const breadcrumbs = [
    { label: 'Products', href: '/' },
    { label: `Results for query "${query}"`, href: `/search?query=${encodeURIComponent(query)}`, active: true }
  ];

  return (
    <main className='container mx-auto py-4'>
        <Breadcrumbs items={breadcrumbs} />
      
    </main>
  )
}