import Link from 'next/link';
import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from './ui/breadcrumb';
import { Home } from 'lucide-react';
interface BreadcrumbsProps {
  items: { label: string; href: string ,active?:boolean}[];
}
export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <Breadcrumb className='mb-6'>
    <BreadcrumbList>
    <BreadcrumbItem>
    <BreadcrumbLink href='/'> 
    <Home className='h-4 w-4'/>
    </BreadcrumbLink>
    </BreadcrumbItem>
    {items.map((item, index) => (
      <React.Fragment key={index}>
      <BreadcrumbSeparator />
      <BreadcrumbItem >
      <BreadcrumbLink 
      key={index}
      href={item.href}
      className={item.active ? 'active' : ''}
      aria-current={item.active ? 'page' : undefined}
    >
      {item.label}
    </BreadcrumbLink>
    </BreadcrumbItem>
     </React.Fragment>
    ))}
   
    </BreadcrumbList>
    </Breadcrumb>
  )
}
