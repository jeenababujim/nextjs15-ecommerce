
import { Product } from "./generated/prisma/client";
import ProductCard from "./productCard";
import { prisma } from "@/lib/prisma";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Suspense } from "react";
import ProductSkeleton from "./productSkeleton";
import { getProductBySlug } from "@/lib/actions";
import { sleep } from "@/lib/utils";
type searchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const pageSize=3;
async function Products({page}: { page: number }) {
 
 const skip=(page-1)*pageSize;
    const products = await prisma.product.findMany({
    skip: skip,
    take: pageSize,
    orderBy: {id: 'asc'}
  });
  await sleep(3000);

 return(
   <>
      <p>showing {products.length} products</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"> 
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))} 
      </div>
  </>
 )
  //return products;
}


export default async function HomePage(props: { searchParams: searchParams }) {
  const searchparams = await props.searchParams;
  const page= Number(searchparams.page) || 1;
  // console.log(await getProductBySlug('smart-watch'));
  const total=await prisma.product.count();
  const totalPages=Math.ceil(total/pageSize);
  // Simulate a 1 second delay for demo purposes
  
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Home Page</h1>
     <Suspense key={page} fallback={<ProductSkeleton/>}> 
      <Products page={page}/>
     </Suspense>
  <Pagination className="mt-8 flex justify-center">
  <PaginationContent>

    <PaginationItem>
      <PaginationPrevious href={`?page=${page - 1}`} />
    </PaginationItem>
{Array.from({ length: totalPages }).map((_, index) => (
  <PaginationItem key={index}>
    <PaginationLink
      href={`?page=${index + 1}`}
      className={page === index + 1 ? 'active' : ''}
    >
      {index + 1}
    </PaginationLink>
  </PaginationItem>
))}

     <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem> 

    <PaginationItem>
      <PaginationNext href={`?page=${page + 1}`} />
    </PaginationItem>

  </PaginationContent>
</Pagination>
  
    </main>
  );
}
