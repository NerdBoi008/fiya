'use client'

import { Category, Product, QueryParams } from "@/types/index.types"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { categoriesData, popularProductsData } from "@/constants/mock-data"
import CustomButton from "@/components/CustomButton"
import Image from "next/image"
import { buildUrl } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"


export default function ProductsPage() {
  
  const searchParams = useSearchParams()
  const router = useRouter()
  const [progress, setProgress] = useState<number>(0)

  let categoryId = searchParams.get('categoryId') as QueryParams['categoryId']
  
  // THIS IS MOCK DATA REMOVE IT DURING PRODUCTION
  if (!categoryId) {
    categoryId = categoriesData[0].id
  }
  const { productsId }: Category = categoriesData.find((item) => item.id === categoryId)!
  
  const productList: Product[] = []
  productsId.forEach((item) => {
    productList.push(popularProductsData.find((prod) => prod.productId === item)!)
  })

  return (
    <main className="container-x-padding space-y-3">

      <Progress value={progress} className="fixed inset-0 z-50 w-full rounded-none h-1" />
      
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" >Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">{categoriesData.find((category) => category.id === categoryId)?.categoryName}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="flex gap-5">

        {/* Side Categories Links */}
        <aside className="w-56 block max-lg:hidden space-y-2 mt-3">
          <p className="text-md font-semibold">Categories</p>
          <div className="px-3">
            {categoriesData.map((category, index) => (
              <p
                key={index}
                onClick={() => {
                  router.push(buildUrl('/products', { categoryId: category.id }))
                }}
                className={`${(category.id === categoryId) ? 'text-primary font-semibold' : "text-muted-foreground"} block cursor-pointer hover:text-primary hover:underline`}
              >
                {category.categoryName}
              </p>
            ))}
          </div>
        </aside>

        <aside className="space-y-3 w-full">

          {/* Change category button */}
          <div className="flex justify-between items-center">
            <h1 className="text-heading">{categoriesData.find((category) => category.id === categoryId)?.categoryName}</h1>
            
              <DropdownMenu>
                <DropdownMenuTrigger className="lg:hidden">
                  <CustomButton
                    onClick={() => { }}
                    variant='outline'
                    classNames=''
                    label="Change Category"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Results</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          </div>

          {/* All products grid */}
          <div className="grid max-md:grid-cols-2 max-xl:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  w-full gap-4">
            {productList.map(({ productId, weight, actualPrice, offerPrice, imgSrc, name, form, rating }: Product, index) => {
              return (
              <div
                key={index}
                onClick={() => {
                  setProgress(70)
                  router.push(buildUrl('/products/product-details',{ productId: productId, categoryId: categoryId}))
                }}
                className='flex flex-col justify-between group w-full cursor-pointer relative p-3 border-2 rounded-md card-hover-effects'
              >
                <div>
                  <Image
                      src={imgSrc}
                      height={400}
                      width={300}
                      alt={name}
                      className='object-cover size-full w-full h-52 rounded-md'
                  />
                  <h6 className='text-lg font-medium group-hover:text-[hsl(28,67%,44%)]'>{name}</h6>
                  
                  <div className='flex flex-row w-full justify-between'>
                    <p className='text-muted-foreground text-sm'>{form}</p>
                    <p className='text-muted-foreground text-sm'>{weight}g</p>
                  </div>
                </div>

                <div className="flex gap-2 items-center justify-between">
                  <div>
                    <p className="text-2xl">&#8377; {offerPrice}</p>
                    <div className="flex gap-1">
                      <p className="line-through text-muted-foreground">{actualPrice}</p>
                      <p className="text-green-600 font-medium">{((actualPrice-offerPrice) / actualPrice * 100).toPrecision(2)}% off</p>
                    </div>  
                  </div>
                  <CustomButton
                    variant='outline'
                    leadingIcon="/add-cart.svg"
                    onClick={function (event: React.MouseEvent): void {
                      event.stopPropagation()
                    }}
                    classNames="border-[1px]"
                      />
                </div>

                <div className="absolute top-0 right-0 bg-[#0c4120e5] flex items-center gap-1 w-fit px-2 py-[1px] rounded-md">
                  <p className="text-white text-sm">{rating}</p>
                  <Image src="/star-white.svg" height={16} width={16} alt="star icon" />
                </div>

            </div>
            )})}
          </div>
        </aside>
      </section>
    </main>
  )
}

