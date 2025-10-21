



import Image from "next/image";
import { formatPrice } from "@/lib/utils";

import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Prisma } from "@/app/generated/prisma/client";

interface OrderItemsProps {
  orderItem: Prisma.OrderItemGetPayload<{
    include:{
      product:true;
    }
  }>
}
export default function OrderItem({ orderItem }: OrderItemsProps) {
  
  return (
    <li
      className="
        rounded-2xl shadow-sm border border-muted
        p-4 sm:p-6 mb-4
        mx-4 sm:mx-0
        flex flex-col sm:flex-row sm:items-center justify-between gap-6
      "
    >
      {/* Left: Image & Product Info */}
      <div className="flex items-start sm:items-center gap-4 relative">
        {/* Remove Button - same place */}
       

        {/* Product Image */}
        <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg border border-muted">
          <Image
            className="object-cover w-full h-full"
            width={128}
            height={128}
            src={orderItem.product.image || ""}
            alt={orderItem.product.name}
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <span className="font-semibold text-base sm:text-lg">
            {orderItem.product.name}
          </span>
          {/* <span className="text-sm text-muted-foreground">
            {formatPrice(orderItem.product.price)} each
          </span> */}
        </div>
      </div>

      {/* Right: Price & Quantity */}
      <div className="flex flex-row sm:flex-col justify-between sm:items-end w-full sm:w-auto gap-3 sm:gap-2">
        {/* Total Price */}
        <p className="font-bold text-base sm:text-lg">
          {formatPrice(orderItem.product.price)}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center ">
        <p className="font-bold text-base sm:text-lg">
          Quantity: { orderItem.quantity}
        </p>
        </div>
      </div>
    </li>
  );
}
