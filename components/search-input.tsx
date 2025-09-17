"use client"
import React, { use, useEffect } from 'react'
import { Input } from './ui/input'
import { SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchInput() {
    const router=useRouter();
    const searchParams=useSearchParams();
    const initialQuery=searchParams.get('query') || '';
    const [query,setQuery]=React.useState(initialQuery);
    
    useEffect(()=>{
        setQuery(initialQuery);
    },[initialQuery])
    const handleSearch=(e:React.FormEvent)=>{
        e.preventDefault();
        // Handle search logic here, e.g., redirect to search results page
        console.log('Searching for:', query);
        const trimmedQuery=query.trim();
        const params=new URLSearchParams();
        if(trimmedQuery){
            params.set('query',trimmedQuery);
            router.push(`/search?${params.toString()}`);
        }else{
            
        }
        const queryString=params.toString();
    }
  return (
   <form className='relative w-full' onSubmit={handleSearch}>
    <SearchIcon  className='absolute w-4 h-4 text-muted-foreground left-2.5 top-1/2 
    transform -translate-y-1/2' />
   <Input type="search" 
   placeholder='Search products...'  className='pl-8'
   value={query}
   onChange={(e)=>setQuery(e.target.value)}
   />
   
   </form>
  )
}
