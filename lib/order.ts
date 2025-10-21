"use server";

import { cookies } from "next/headers";
import { getCart } from "./actions";
import { prisma } from "./prisma";
import { createCheckoutSession, OrderWithItemsAndProduct } from "./stripe";
import { auth } from "./auth";
export type processCheckoutResponse={
    sessionUrl: string | null;
    order:OrderWithItemsAndProduct;
}

export async function processCheckout():Promise<processCheckoutResponse> {
  const cart = await getCart();
const session=await auth();
const userId=session?.user?.id;
  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }
  let orderId: string | null = null;
  try {
    const order = await prisma.$transaction(async (tx) => {
      const total = cart.subtotal;
      const newOrder = await tx.order.create({
        data: {
          total,
          userId : userId || null
        },
      });
      const orderItems = cart.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        orderId: newOrder.id,
        price: item.product.price,
      }));
      await tx.orderItem.createMany({
        data: orderItems,
      });
      await tx.cartItem.deleteMany({
        where: {
          cartId: cart.id,
        },
      });
      await tx.cart.delete({
        where: {
          id: cart.id,
        },
      });
      return newOrder;
    });
    orderId = order.id;
    const fullOrder = await prisma.order.findUnique({
      where: {
        id: order.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!fullOrder) {
      throw new Error("order not found");
    }
    const { sessionId, sessionUrl } = await createCheckoutSession(fullOrder);
    if (!sessionId && !sessionUrl) {
      throw new Error("Failed to create stripe session");
    }
    await prisma.order.update({
      where: {
        id: fullOrder.id,
      },
      data: {
        stripeSessionId: sessionId,
        status: "pending_payment",
      },
    });
    (await cookies()).delete("cartId");
    return {
        sessionUrl,
        order:fullOrder
    };
  } catch (error) {
    if (orderId && error instanceof Error && error.message.includes("Stripe")) {
      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: "failed",
        },
      });
    }
    console.error("Error creating order:", error);
    throw new Error("Failed to create order");
  }
}
