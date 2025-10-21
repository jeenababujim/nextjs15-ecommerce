
import { prisma } from '@/lib/prisma';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react'

interface orderPageProps{
    params:Promise<{
        orderId:string;
    }>;
}


export default async function orderPage({params}:orderPageProps) {

const {orderId} = await params;

const order=await prisma.order.findUnique({
    where: {
        id:orderId
    },
    include:{
        items:{
            include:{
                product:true
            }
        }
    }
});
if(!order) {
    notFound();

}
  return (
    // <div>
    //  <h1>Order Details</h1>  
    //   <p>Order ID:{order.id}</p>  
    //     <p>Status:{order.status}</p>
    //     <h2>Items</h2>
    //     <ul>
    //         {order.items.map(item => (
    //           <li key={item.id}>
    //             {item.product.name}-Quantity:{item.quantity}
    //           </li>  
    //         ))}
    //     </ul>
    // </div>
   <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
  <div className="bg-white rounded-xl shadow-md border p-6 w-full sm:w-[70%] max-w-3xl">
        
        {/* Header */}
        <div className="text-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
          <p className="text-sm text-gray-600">Review your order below</p>
        </div>

        {/* Order Info */}
        <div className="mb-6 space-y-4">
          <div>
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="font-mono text-sm text-gray-900 break-all">{order.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <span
              className={`inline-block  py-1 rounded-full text-sm font-medium ${
                order.status === "COMPLETED"
                  ? "bg-green-100 text-green-700"
                  : order.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >{order.status.toLowerCase()}
            </span>
          </div>
        </div>

        {/* Items */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Items</h2>
          <ul className="divide-y divide-gray-200">
            {order.items.map((item: any) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div className="flex flex-col">
                  <span className="text-gray-900 font-medium">{item.product.name}</span>
                  <span className="text-sm text-gray-500">Quantity: {item.quantity}</span>
                </div>
                {item.product.image && (
                  <div className="w-16 h-16 relative flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="rounded-lg object-cover border"
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    
  )
}
