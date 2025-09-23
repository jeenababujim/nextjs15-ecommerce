
"use client"
import { Product } from "@/app/generated/prisma/client";
import ProductCard from "@/app/productCard";
import { prisma } from "@/lib/prisma";


type ProductListProps={
   products: Product[];
       
}
export  function ProductsList({products}:  ProductListProps) {

if(products.length === 0){
  return <div className='text-center text-muted-foreground'>No products found</div>
}
 return(
   <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"> 
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))} 
      </div>
  </>
 )
  
}
