import React from 'react'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { categories } from './navbar'

export default function MobileNav() {
  return (
    <Sheet>
    <SheetTrigger asChild className='md:hidden'>
        <Button variant='ghost' size='icon' className='p-2 rounded-md hover:bg-muted transition'>
            <Menu className='h-5 w-5'/> 
        </Button>
    </SheetTrigger>
    <SheetContent side='left' className='w-64 p-0'>
        <SheetHeader className='p-4 border-b'>
            <SheetTitle>
                Menu
            </SheetTitle>
        </SheetHeader>
        <nav className='flex flex-col p-4 gap-4'>
            <SheetClose asChild>
           <Link href='/' >Home</Link>
           </SheetClose>
              <SheetClose asChild>
              <Link href='/about' >About</Link>
                </SheetClose>
              <SheetClose asChild>
              <Link href='/contact' >Contact</Link>
                </SheetClose>
              <SheetClose asChild>
              <Link href='/products' >Products</Link>
                </SheetClose>
                <div>
                    <h3 className='text-xs font-medium text-muted-foreground mb-2'>
                        Categories
                    </h3>
                    {categories.map((category)=>(
                      <SheetClose asChild key={category.id}>
                      <Link href={category.href} className='block py-2 text-sm font-medium'>
                      {category.name}
                      </Link>
                      </SheetClose>
                    ))} 
                </div>
              <SheetClose asChild>
              <Link href='/blog' >Blog</Link>
                </SheetClose>
        </nav>
    </SheetContent>
    </Sheet>
  )
}
