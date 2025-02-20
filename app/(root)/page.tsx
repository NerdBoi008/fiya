'use client'

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import useStore from "@/lib/store/useStore";
import { buildUrl } from "@/lib/utils";
import { Category, Product } from "@/types/index.types";
import { ShoppingBagIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

  // main state for categories and products
  const [categories, setCategories] = useState<Category[] | null>();
  const [products, setProducts] = useState<Product[] | null>();

  const [progress, setProgress] = useState<number>(0);
  const router = useRouter();

  const { categories: categoriesApi, products: productsApi, fetchCategories, fetchProducts } = useStore();

  useEffect(() => {
    if (!categoriesApi) fetchCategories();
    if (!productsApi) fetchProducts();

    if (categoriesApi) setCategories(categoriesApi);
    if (productsApi) setProducts(productsApi);

  }, [categoriesApi, productsApi, fetchCategories, fetchProducts]);
  

  return (
    <main className="">

      <Progress value={progress} className="fixed inset-0 z-50 w-full rounded-none h-1"/>


      {/* Hero section */}
      <div className="flex flex-row-reverse relative">

        <Button
          className="absolute z-10 bottom-3 right-3 sm:right-10 md:right-10 lg:right-20 xl:right-20 border-2 border-secondary hover:bg-secondary hover:text-white"
          variant={'outline'}
          onClick={() => {
            router.push(buildUrl('/products',{ categoryId: categories?.[0].id}))
          }}
        >
          <ShoppingBagIcon/>
          Browse products
        </Button>

        <aside className="absolute z-10 left-5  top-10 max-md:pr-10  sm:left-10 md:left-10 lg:left-20 xl:left-20">
          <h1
            className="text-3xl  sm:text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl text-primary select-none max-w-[70vw]">
            Pure, Healthy, Delicious: Your Gateway to Natural Goodness
          </h1>
          <h6
            className="max-sm:visible max-sm:block max-xl:hidden hidden select-none" >
            Discover our range of premium dehydrated foods.
          </h6>
        </aside>

        <section className="h-[70vh] xl:h-[65vh] w-full">
          <Image
            src={"/assets/hi-2.webp"}
            alt={"hero-image"}
            fill
            className="object-cover object-[50%_80%]"
          />
        </section>

      </div>

      <div className="container-x-padding space-y-5 mt-5">

        {/* Popular products */}
        <section className="space-y-4">
          <h1 className="text-heading">Popular Products</h1>
          <div className="grid max-md:grid-cols-2 max-xl:grid-cols-3 xl:grid-cols-5  w-full gap-5">
            {products ? products?.map(({ imgSrc, name, form, productId }, index) => (
              <div
                key={index}
                onClick={() => {
                  router.push(buildUrl('/products/product-details',{ productId: productId}))
                }}
                className='w-full cursor-pointer'>
                <Image
                    src={imgSrc}
                    height={400}
                    width={300}
                    alt={name}
                    className='object-cover size-full w-full h-52 rounded-md'
                />
                <h6 className='text-lg font-medium'>{name}</h6>
                <div className='flex flex-row w-full justify-between'>
                  <p className='text-muted-foreground'>{form}</p>
                  {/* <p className='text-muted-foreground'>{weight}g</p> */}
                </div>
            </div>
            )) : (
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="w-full animate-pulse">
                  <div className="w-full h-52 bg-gray-300 rounded-md"></div>
                  <div className="h-4 bg-gray-300 rounded-md mt-2 w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded-md mt-1 w-1/2"></div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Categories Carousel */}
        <section className="space-y-4 ">
          <h1 className="text-heading">Categories</h1>
          <div className="px-10">
            <Carousel className="" >
                <CarouselPrevious />

                <CarouselContent >
                {categories ? categories?.map(({ id, categoryName, imgSrc}: Category, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3 cursor-pointer"
                    onClick={() => {
                      setProgress(75)
                      router.push(buildUrl('/products',{categoryId: id}))
                    }}
                  >
                      <div className='w-full border-2 p-2 group card-hover-effects rounded-md'>
                        <Image
                            src={imgSrc}
                            height={300}
                            width={300}
                            alt={categoryName}
                            className='object-cover w-full h-48 rounded-sm'
                        />
                        <h6 className='text-lg font-medium group-hover:text-[hsl(28,67%,44%)]'>{categoryName}</h6>
                      </div>
                    </CarouselItem>
                  )) : (
                    Array.from({ length: 3 }).map((_, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="w-full border-2 p-2 rounded-md animate-pulse">
                          <div className="w-full h-48 bg-gray-300 rounded-sm"></div>
                          <div className="h-4 bg-gray-300 rounded-md mt-2 w-3/4"></div>
                        </div>
                      </CarouselItem>
                    ))
                  )}
                </CarouselContent>

                <CarouselNext />
              </Carousel>
          </div>
        </section>
      </div>
    </main>
  );
}
