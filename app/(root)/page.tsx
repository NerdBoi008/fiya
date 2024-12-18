'use client'

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import { categoriesData, popularProductsData } from "@/constants/mock-data";
import { buildUrl } from "@/lib/utils";
import { Category } from "@/types/index.types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {

  const [progress, setProgress] = useState<number>(0)
  const router = useRouter();

  return (
    <main className="space-y-8 container-x-padding">

      <Progress value={progress} className="fixed inset-0 z-50 w-full rounded-none h-1"/>


      {/* Hero section */}
      <div className="flex flex-row-reverse relative">

        <aside className="absolute left-0 max-sm:top-14 top-20 max-md:pr-10">
          <h1
            className="max-sm:text-2xl max-md:inline max-md:text-4xl text-primary bg-white rounded-md " >
            Pure, Healthy, Delicious: Your Gateway to Natural Goodness
          </h1>
          <h6
            className="max-md:hidden " >
            Discover our range of premium dehydrated fruits, vegetables, and snacks. Packed with nutrients, perfect for your healthy lifestyle.
          </h6>
          <h6
            className="max-sm:visible bg-white max-sm:block max-xl:hidden " >
            Discover our range of premium dehydrated foods.
          </h6>
        </aside>

        <section className="max-md:w-[80%] w-[50%] relative my-10 -z-10">
          <Image src="/useless/product-demo-img.webp" height={120} width={120} alt="" className="rounded-md absolute z-10 right-5 -top-5 max-sm:hidden  max-md:size-20 max-lg:size-24"/>
          <AspectRatio ratio={16 / 9} >
            <Image
              priority
              src="/assets/hero-image.webp"
              fill
              alt="Hero Image"
              className="rounded-md object-cover"
            />
            <span className="size-full absolute bg-gradient-to-br from-white via-transparent to-transparent rounded-md" />
          </AspectRatio>
          <Image src="/useless/Dehydrated vegetables.jpg" height={140} width={140} alt="" className="rounded-md absolute z-10 left-5 -bottom-5 max-sm:hidden  max-md:size-20 max-lg:size-24 max-xl:size-28"/>
        </section>

      </div>

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
      
    </main>
  );
}
