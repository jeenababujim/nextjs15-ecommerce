import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { NextRequest,NextResponse } from "next/server";

export async function POST(request:NextRequest){
    const payload=await request.text();
    const sig=request.headers.get("Stripe-Signature");
    if(!sig){
        return new NextResponse("Misiing Stripe-Signature header",{status:400});
    }
    const webhookSceret=process.env.STRIPE_WEBHOOK_SCERET!;
    try{
      const event= stripe.webhooks.constructEvent(payload,sig, webhookSceret);
    if(event.type==="checkout.session.completed"){
        const session=event.data.object;
        const orderId=session.metadata?.orderId;
        if(!orderId){
            console.error("No orderId found in session metadata");
            return new NextResponse("No orderId found in the session metadata",{status:400});
        }
        //console.log("Checkout session completed",session);
        await prisma.order.update({
            where:{
                id: orderId,
            },
            data:{
            status:"paid",
            stripePaymentInetentId:session.payment_intent as string
            }
        });
    }else{
        console.warn(`Unhandled event type:,${event.type}`)
    }
    return NextResponse.json({received:true},{status:200})    
    }catch(error){
        console.error(`Error veryfying the stripe webhook ${error}`);
        return new NextResponse("Webhook Error",{status:400});

    }

}