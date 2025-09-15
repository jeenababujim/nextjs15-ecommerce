// console.log("Seeding the database...");
import { PrismaClient, Product } from "../app/generated/prisma";

const prisma = new PrismaClient();

async function main() {

    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
    await prisma.category.deleteMany(); 
    const electronics=await prisma.category.create({
        data:{
            name:"Electronics",
            slug:"electronics"
        }
    });
    const clothing=await prisma.category.create({
        data:{
            name:"Clothing",
            slug:"clothing"
        }
    });
    const home=await prisma.category.create({
        data:{
            name:"Home",
            slug:"home"
        }
    });


const products:Product[]=[
    {
        id: '1',
        name: "Wireless Headphones",
        price: 59.99,
        description: "High-quality wireless headphones with noise cancellation.",
        image: "https://plus.unsplash.com/premium_photo-1678099940967-73fe30680949?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        categoryId: electronics.id,
        slug: "wireless-headphones",
        inventory:15
    },
    {
        id: '2',
        name: "Running Shoes",
        price: 89.99,
        description: "Comfortable and durable running shoes for all terrains.",
        image: "https://images.unsplash.com/photo-1585944672394-4c58a015c1fb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        categoryId: clothing.id,
        slug: "running-shoes",
        inventory:10
    },
    {
        id: '3',
        name: "Smart Watch",
        price: 129.99,
        description: "Track your fitness and stay connected with this smart watch.",
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        categoryId: electronics.id,
        slug: "smart-watch",
        inventory:3
    },
    {
        id: '4',
        name: "Coffee Mug",
        price: 14.99,
        description: "Ceramic coffee mug with a stylish design.",
        image: "https://images.unsplash.com/photo-1605714196241-00bf7a8fe7bb?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        categoryId: home.id,
        slug: "coffee-mug",
        inventory:0
    }
];

for (const product of products) {
    await prisma.product.create({
        data: product
    });
}
}

main()
  .then(async () => {
    console.log("Seeding complete.")
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })