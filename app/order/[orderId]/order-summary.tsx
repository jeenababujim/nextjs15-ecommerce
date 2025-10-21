


import OrderStatusBadge from '@/components/order-status-badge'
import { Badge } from '@/components/ui/badge'
import { OrderWithItemsAndProduct } from '@/lib/stripe'
import { formatPrice } from '@/lib/utils'
import { CheckCircle, Clock, CreditCard, Slash, XCircle } from 'lucide-react'

import React from 'react'

interface OrderSummaryProps{
    order:OrderWithItemsAndProduct
}
// function StatusBadge({status}:{status:string}){
//     const statusMap:Record<string,string>={
// pending:"Pending",
// pending_payment:"Pending Payment",
// payment_processed:"Payment Processed",
// failed:"Failed",
// paid:"Paid",
// canceled:"Canceled"
//     }

// const getStatusStyle = (status: string) => {
//   switch (status) {
//     case "pending":
//       return { color: "#F59E0B", icon: <Clock className="w-4 h-4 mr-1" /> }; // amber-500
//     case "pending_payment":
//       return { color: "#EAB308", icon: <CreditCard className="w-4 h-4 mr-1" /> }; // yellow-500
//     case "pending_processed":
//       return { color: "#A855F7", icon: <CreditCard className="w-4 h-4 mr-1" /> }; // purple-500
//     case "failed":
//       return { color: "#EF4444", icon: <XCircle className="w-4 h-4 mr-1" /> }; // red-500
//     case "paid":
//       return { color: "#22C55E", icon: <CheckCircle className="w-4 h-4 mr-1" /> }; // green-500
//     case "canceled":
//       return { color: "#6B7280", icon: <Slash className="w-4 h-4 mr-1" /> }; // gray-500
//     default:
//       return { color: "#3B82F6", icon: null }; // blue-500
//   }
// };


//   const { color, icon } = getStatusStyle(status);


//     return(
//     <Badge
//       variant="outline"
//       style={{
//         borderColor: color,
//         color: color,
//       }}
//       className="flex items-center font-bold"
//     >
//       {icon}
//       {statusMap[status] || "Unknown"}
//     </Badge>
//     )

// }





export default async function OrderSummary({ order }: OrderSummaryProps) {
   

    return (
        <div className="flex flex-col p-6 rounded-xl shadow-md ">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="text-sm  space-y-3">
                <div className="flex items-center text-muted-foreground justify-between border-b pb-2">
                    <p>Subtotal</p>
                    <p className=" font-medium">{formatPrice(order.total)}</p>
                </div>

                <div className="flex items-center text-muted-foreground justify-between border-b pb-2">
                    <p>Taxes</p>
                    <p >{formatPrice(0)}</p>
                </div>

                <div className="flex items-center text-muted-foreground justify-between border-b pb-2">
                    <p>Shipping</p>
                    <p >{formatPrice(0)}</p>
                </div>
                <div className="flex items-center  justify-between border-b pb-2">
                    <p>Status</p>
                   <OrderStatusBadge  status={order.status}/>
                </div>

                <div className="flex items-center justify-between border-b pb-2 ">
                    <p className='font-bold text-base sm:text-lg'>Total</p>
                    <p className='font-bold text-base sm:text-lg'>{formatPrice(order.total)}</p>
                </div>
            </div>

           
        </div>
    )
}
