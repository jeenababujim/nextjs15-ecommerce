'use server';

import { Prisma } from "@/app/generated/prisma/client";
import { prisma } from "./prisma";

export interface GetProductParams{
    query?: string;
    slug?: string;
    sort?: string;
    page?: number;
    pageSize?: number;
}
export async function getProducts({
    query,
    slug,
    sort,
    page=1,
    pageSize=3,
}:GetProductParams){
const where: Prisma.ProductWhereInput={};
if(query){
    where.OR=[
        {name:{contains:query,mode:"insensitive"},},
        {description:{contains:query,mode:"insensitive"},}
    ]
}
if(slug){
    where.category={
        slug:slug
}
}
let orderBy: Record< string,"asc" | "desc" > | undefined ;
if(sort === "price_asc"){
    orderBy = {price:"asc"}
}else if(sort=== "price_desc"){
    orderBy = {price:"desc"}
}
const skip=pageSize?(page-1)* pageSize : undefined;
const take=pageSize?pageSize:undefined;
return await prisma.product.findMany({
    where,
    orderBy,
    skip,
    take

})
}

export async function getProductBySlug(slug: string) {
    const product=await prisma.product.findUnique({
        where:{slug:slug},
        include:{
           
            category:true
        }   
    });
    if(!product) return null;
    return product;
}