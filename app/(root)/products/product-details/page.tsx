'use client'

import BreadCrumbLinkCustom from '@/components/BreadCrumbLinkCustom'
import CustomButton from '@/components/CustomButton'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import useStore from '@/lib/store/useStore'
import { buildUrl } from '@/lib/utils'
import { Category, Product, QueryParams } from '@/types/index.types'
import Image from 'next/image'
import { notFound, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function ProductDetailsPage() {
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const [progress, setProgress] = useState<number>(0);
  
  // main state for categories and products
  const [categories, setCategories] = useState<Category[] | null>();
  const [products, setProducts] = useState<Product[] | null>();
  
  const [mainImageSrc, setMainImageSrc] = useState<string | null>();

  const { categories: categoriesApi, products: productsApi, fetchCategories, fetchProducts } = useStore();

  // Get productId or search query from URL
  const productId: string | undefined = (searchParams.get('productId') as QueryParams['productId']) ?
    (searchParams.get('productId') as QueryParams['productId']) :
    (searchParams.get('search') as QueryParams['search']);
  
  const categoryId: string | undefined = searchParams.get('categoryId') as QueryParams['categoryId']
  
  // Fetch categories and products if not already fetched
  useEffect(() => {
    if (!categoriesApi) fetchCategories();
    if (!productsApi) fetchProducts();

    if (categoriesApi) setCategories(categoriesApi);
    if (productsApi) setProducts(productsApi);
    
  }, [categoriesApi, productsApi, fetchCategories, fetchProducts]);
  
  // Find the product based on productId
  const product: Product | undefined = products?.find((item) => item.productId === productId);

  // Check if the product exists after products are loaded
  useEffect(() => {
    if (products && !product) {
      notFound(); // Navigate to NotFound page if product does not exist
    }
    
    if (product?.imgSrc) {
      setMainImageSrc(product.imgSrc);
    }

  }, [products, product]);

  // If product is not yet loaded, show a loading state
  if (!products || !product) {
    return <div>Loading...</div>;
  }

  const { productId: prodId , otherImgSrcSet, name, form, weight, actualPrice, offerPrice,  rating, ingredients, description, highlights, }: Product = product

    return (
      <main className='container-x-padding space-y-3 w-full flex-1'>

        {/* New page loading progress */}
        <Progress value={progress} className="fixed inset-0 z-50 w-full rounded-none h-1"/>

        {/* BreadCrumbs */}
        <div>
          <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
                <BreadCrumbLinkCustom href="/" >Home</BreadCrumbLinkCustom>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
              {(categoryId) ? ( // shows product breadcrum if productId is present
                <>
                  <BreadcrumbItem>
                    <BreadCrumbLinkCustom href={buildUrl('/products', { categoryId: categoryId })}>Products</BreadCrumbLinkCustom>
                  </BreadcrumbItem>
                </>
              ) : (
                <BreadcrumbItem>
                  <BreadCrumbLinkCustom href="/products">Products</BreadCrumbLinkCustom>
                </BreadcrumbItem>
                )
              }
              {categoryId && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadCrumbLinkCustom href={buildUrl('/products', { categoryId: categoryId })}>{categories?.find((item) => item.id === categoryId)?.categoryName}</BreadCrumbLinkCustom>
                  </BreadcrumbItem>
                </>
              )}
              
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadCrumbLinkCustom href="#">{products?.find((product) => product.productId === productId)?.name}</BreadCrumbLinkCustom>
              </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        </div>

        {/* Product Heading */}
        <div className='flex justify-between  sticky top-16 bg-background z-30 py-1'>
          <h1 className='text-heading'>Proudct Details</h1>
          <div className='flex gap-2 '>
            <CustomButton
              onClick={function (): void {
              throw new Error('Function not implemented.')
              }}
              variant={'outline'}
              leadingIcon='/add-cart.svg'
              label='Add to cart'
              classNames='flex-1'
            />
            <Button
              onClick={function (): void {
                setProgress(77)
                router.push(buildUrl('/checkout', { productId: prodId } ))
              }}
            >
              Checkout
            </Button>
          </div>
        </div>

        {/* Main product details component */}
        <section className='flex max-md:flex-col gap-7 '>
          <aside className='space-y-2 flex-col justify-center 2xl:w-[500px] xl:w-[400px] md:w-[300px] max-sm:size-full'>
            {mainImageSrc ? (
              <Image
                src={mainImageSrc}
                alt="Product image"
                height={500}
                width={500}
                className="object-cover 2xl:size-[500px] xl:size-[400px] md:size-[300px] sm:size-full"
              />
            ) : (
              <div className="w-full h-[500px] bg-gray-200 animate-pulse rounded-md" /> // Placeholder until image loads
            )}
            <ScrollArea className='w-full'>
              <div className='flex flex-row gap-2'>
                {otherImgSrcSet.map((imgSource, index) => (
                  <Image
                    key={index}
                    src={imgSource}
                    alt={imgSource}
                    width={500}
                    height={500}
                    onClick={() => setMainImageSrc(imgSource)}
                    className='cursor-pointer object-cover size-40 max-lg:size-32 '
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <div>
              
            </div>
          </aside>
          <aside className="flex-1 space-y-3">
            <div>
              <h1 className='text-heading'>{name}</h1>
              <p className='text-muted-foreground'>{form}</p>

              <p>{weight}g pack</p>
              <div className="bg-[#0c4120e5] flex items-center gap-1 w-fit px-2 py-[1px] rounded-md mt-1">
                <p className="text-white text-sm">{rating}</p>
                <Image src="/star-white.svg" height={16} width={16} alt="star icon" />
              </div>

              <div className="flex gap-2 items-center mt-3">
                <p className="text-4xl">&#8377; {offerPrice}</p>
                <div className="flex gap-1">
                  <p className="line-through text-muted-foreground">{actualPrice}</p>
                  <p className="text-green-600 font-medium">{((actualPrice-offerPrice) / actualPrice * 100).toPrecision(2)}% off</p>
                </div>  
              </div>
            </div>

            <div>
              <p className="text-heading-medium">Ingredients</p>
              <Separator />
              <ul className='list-disc list-inside mt-3'>
                {ingredients.map((item, index) => (
                  <li key={index} className='text-sm'>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-heading-medium">Highlights</p>
              <Separator />
              <ul className='list-disc list-inside mt-3'>
                {highlights.map((item, index) => (
                  <li key={index} className='text-sm'>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-heading-medium">Description</p>
              <Separator />
              <p className='mt-3'>{description}</p>
            </div>
          </aside>
        </section>

      </main>
    )
}