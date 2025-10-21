
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
import Breadcrumbs from "@/components/breadcrumbs";
import ProductListServerWrapper from "@/components/productListServerWrapper";
import { stripe } from "@/lib/stripe";


type searchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const pageSize=3;
// async function Products({page}: { page: number }) {
 
//  const skip=(page-1)*pageSize;
//     const products = await prisma.product.findMany({
//     skip: skip,
//     take: pageSize,
//     orderBy: {id: 'asc'}
//   });
//   await sleep(3000);

//  return(
//    <>
 
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"> 
//         {products.map((product: Product) => (
//           <ProductCard key={product.id} product={product} />
//         ))} 
//       </div>
//   </>
//  )
//   //return products;
// }


export default async function HomePage(props: { searchParams: searchParams }) {
  const searchparams = await props.searchParams;
  const page= Number(searchparams.page) || 1;
  // console.log(await getProductBySlug('smart-watch'));
  const total=await prisma.product.count();
  const totalPages=Math.ceil(total/pageSize);
  // Simulate a 1 second delay for demo purposes
  console.log(await stripe.events.list({limit:1}))
  
  return (
    <main className="container mx-auto py-4">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }]} />
     <Suspense key={page} fallback={<ProductSkeleton/>}> 
      {/* <Products page={page}/> */}
      <ProductListServerWrapper params={{page,pageSize}} />
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
