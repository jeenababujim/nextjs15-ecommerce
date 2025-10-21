
import React from 'react'
import { Badge } from './ui/badge'
import { CheckCircle, Clock, CreditCard, Slash, XCircle } from 'lucide-react';



export default function OrderStatusBadge({status}:{status:string}){
    const statusMap:Record<string,string>={
pending:"Pending",
pending_payment:"Pending Payment",
payment_processed:"Payment Processed",
failed:"Failed",
paid:"Paid",
canceled:"Canceled"
    }

const getStatusStyle = (status: string) => {
  switch (status) {
    case "pending":
      return { color: "#F59E0B", icon: <Clock className="w-4 h-4 mr-1" /> }; // amber-500
    case "pending_payment":
      return { color: "#EAB308", icon: <CreditCard className="w-4 h-4 mr-1" /> }; // yellow-500
    case "pending_processed":
      return { color: "#A855F7", icon: <CreditCard className="w-4 h-4 mr-1" /> }; // purple-500
    case "failed":
      return { color: "#EF4444", icon: <XCircle className="w-4 h-4 mr-1" /> }; // red-500
    case "paid":
      return { color: "#22C55E", icon: <CheckCircle className="w-4 h-4 mr-1" /> }; // green-500
    case "canceled":
      return { color: "#6B7280", icon: <Slash className="w-4 h-4 mr-1" /> }; // gray-500
    default:
      return { color: "#3B82F6", icon: null }; // blue-500
  }
};


  const { color, icon } = getStatusStyle(status);


    return(
    <Badge
      variant="outline"
      style={{
        borderColor: color,
        color: color,
      }}
      className="flex items-center font-bold"
    >
      {icon}
      {statusMap[status] || "Unknown"}
    </Badge>
    )

}


