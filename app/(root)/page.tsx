'use client'

import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import { categoriesData, popularProductsData } from "@/constants/mock-data";
import { buildUrl } from "@/lib/utils";
import { Category } from "@/types/index.types";
import { ShoppingBagIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {

  const [progress, setProgress] = useState<number>(0)
  const router = useRouter();

  return (
    <main className="">

      <Progress value={progress} className="fixed inset-0 z-50 w-full rounded-none h-1"/>


      {/* Hero section */}
      <div className="flex flex-row-reverse relative">

        <Button
          className="absolute z-10 bottom-3 right-3 sm:right-10 md:right-10 lg:right-20 xl:right-20 border-2 border-secondary"
          variant={'outline'}
          onClick={() => {
            router.push(buildUrl('/products',{ categoryId: categoriesData[0].id}))
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
            className="max-sm:hidden select-none max-w-[65vw] text-lg xl:text-2xl" >
            Discover our range of premium dehydrated fruits, vegetables, and snacks. Packed with nutrients, perfect for your healthy lifestyle.
          </h6>
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
            {popularProductsData.map(({ imgSrc, name, form, productId }, index) => (
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
            ))}
          </div>
        </section>

        {/* Categories Carousel */}
        <section className="space-y-4 ">
          <h1 className="text-heading">Categories</h1>
          <div className="px-10">
            <Carousel className="" >
                <CarouselPrevious />

                <CarouselContent >
                {categoriesData.map(({ id, categoryName, imgSrc}: Category, index) => (
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
                  ))}
                </CarouselContent>

                <CarouselNext />
              </Carousel>
          </div>
        </section>
      </div>
    </main>
  );
}
