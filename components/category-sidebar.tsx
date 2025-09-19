import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import React from 'react'

export default async function CategorySidebar({activeCategory}:{activeCategory?:string}) {
    const categories=await prisma.category.findMany({
        select:{
            name:true,
            slug:true,
        },
            orderBy:{
                name:"asc"
            }
        ,
    })
  return (
//     <div className='hidden lg:block'>
//       <div className='sticky top-0 z-10 flex h-full w-64 flex-col overflow-y-auto  
//        border-r bg-background'>
//        <div className='flex-1 px-4 py-6'>
//         <h2 mb-4 text-lg font-semibold>
//          Categories
//         </h2>
//         <ul className='space-y-2'>
// {
//     categories.map((category)=>(
//        <li key={category.slug}>
//         <Link href={`/category/${category.slug}`}
//          className='block p-2 text-sm font-medium 
//          text-muted-forground 
//          hover:bg-accent 
//          hover:text-accent-foreground '>{category.name}
//         </Link>
//        </li> 
//     ))
// }
//         </ul>
//       </div> 
//      </div>  
//     </div>



<div className='w-[125px]'>
<h3 className='text-xs text-muted-foreground mb-2'>Collections</h3>
</div>
  )
}
