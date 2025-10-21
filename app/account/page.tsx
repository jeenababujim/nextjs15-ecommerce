import Breadcrumbs from '@/components/breadcrumbs';
import OrderStatusBadge from '@/components/order-status-badge';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function AccountOrderPage() {
    const session=await auth();
    if(!session?.user){
        redirect("/auth/signin");
    }
    const orders=await prisma.order.findMany({
        where: {
            userId: session.user.id,
        },
        orderBy:{
            createdAt:"desc"
        }
    });
  return (
<main className='container mx-auto py-4'>
<Breadcrumbs items={[
    {
        label:"My Account",
        href:"/account",
        active:true,
    }
]}/>
<Table>
<TableHeader>
    <TableRow>
        <TableHead>Order ID</TableHead>
         <TableHead>Date</TableHead>
         <TableHead>Total</TableHead>
         <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
    </TableRow>
</TableHeader>  
<TableBody>
    {orders.length===0 && (
        <TableRow>
            <TableCell colSpan={5} className='h-24 text-center'>
                No orders found
            </TableCell>
        </TableRow>   
    )}
     { orders.map((order)=>(
          <TableRow key={order.id}>
          <TableCell>{order.id.slice(0,8)}...</TableCell>
          <TableCell>{order.createdAt.toLocaleDateString()}</TableCell>
           <TableCell>{formatPrice(order.total)}</TableCell>
           <TableCell> <OrderStatusBadge  status={order.status}/></TableCell>
            <TableCell>
                <Link className='underline' href={`/order/${order.id}`}>View</Link>
                
            </TableCell>
        </TableRow>  
        )) }

</TableBody>  
</Table>
</main>
  )
}
