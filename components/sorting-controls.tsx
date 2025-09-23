"use client"
import { cn } from '@/lib/utils';
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

export default function SortingControls() {
   const pathname=usePathname();
   const searchParams=useSearchParams();
   const currentSort=searchParams.get("sort");
   const createSortUrl= (sortValue:string | null) =>{
        const params=new URLSearchParams(searchParams.toString());
        if(sortValue){
            params.set("sort",sortValue)
        }else{
            params.delete("sort")
        }
        const queryString=params.toString();
        return `${pathname}${queryString?`?${queryString}`: ""}`
   };
  return (
    <>
    <h3 className='text-xs text-muted-foreground mb-2'>Sort By</h3>
       <ul className=''>
        <li><Link href={createSortUrl(null)} className={cn("text-sm text-primary",!currentSort? "underline":"")}>Latest</Link></li>
        <li><Link href={createSortUrl('price_asc')} className={cn("text-sm text-primary",currentSort === 'price_asc'? "underline":"")}>Price Low to High</Link></li>
        <li><Link href={createSortUrl('price_desc')} className={cn("text-sm text-primary",currentSort === 'price_desc'? "underline":"")}>Price High to Low</Link></li>
       </ul>
    </>
  )
}
