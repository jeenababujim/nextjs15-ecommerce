import Link from 'next/link'
import React from 'react'

export default function Menu() {
  return (
    <div >
       
        <ul className='flex items-center gap-4'>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/products">Products</Link></li>
        </ul>
    </div>
  )
}
