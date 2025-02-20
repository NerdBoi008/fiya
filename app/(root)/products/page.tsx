'use client'

import { Category, Product, QueryParams } from "@/types/index.types"
import { notFound, useRouter, useSearchParams } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
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
import CustomButton from "@/components/CustomButton"
import Image from "next/image"
import { buildUrl, cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"
import useStore from "@/lib/store/useStore"
import BreadCrumbLinkCustom from "@/components/BreadCrumbLinkCustom"


export default function ProductsPage() {
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const [progress, setProgress] = useState<number>(0);

  // main state for categories and products
  const [categories, setCategories] = useState<Category[] | null>();
  const [products, setProducts] = useState<Product[] | null>();
  const [productList, setProductList] = useState<Product[] | null>();
  const [categoryId, setCategoryId] = useState<string | null>();

  const { categories: categoriesApi, products: productsApi, fetchCategories, fetchProducts } = useStore();

  // Fetch categories and products
  useEffect(() => {
    if (!categoriesApi) fetchCategories();
    if (!productsApi) fetchProducts();

    if (categoriesApi) setCategories(categoriesApi);
    if (productsApi) setProducts(productsApi);
    
  }, [categoriesApi, productsApi, fetchCategories, fetchProducts]);
  
  // Handle categoryId from URL
  useEffect(() => {
    const newCategoryId = searchParams.get('categoryId') as QueryParams['categoryId'];
    setCategoryId(newCategoryId);

  }, [searchParams])
  
  // Handle default category and product list logic
  useEffect(() => {
    if (!categories || !products) return;

    let selectedCategoryId = categoryId;

    // If categoryId is not provided in the URL, default to the first category
    if (!selectedCategoryId && categories.length > 0) {
      selectedCategoryId = categories[0].id;
      setCategoryId(selectedCategoryId); // Update categoryId state
    }

    const selectedCategory = categories.find((item) => item.id === selectedCategoryId);
    const productsId = selectedCategory?.productsId;

    // If the categoryId provided in the URL does not exist, navigate to NotFound
    if (!selectedCategory || !productsId) {
      notFound(); // Navigate to NotFound page
    }

    // Filter products based on productsId
    const filteredProducts = products.filter((prod) => productsId.includes(prod.productId));
    setProductList(filteredProducts);
  }, [categories, categoryId, products]);
  
  return (
    <main className="container-x-padding space-y-3 flex-1">

      <Progress value={progress} className="fixed inset-0 z-50 w-full rounded-none h-1" />
      
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadCrumbLinkCustom href="/" >Home</BreadCrumbLinkCustom>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadCrumbLinkCustom href="#">Products</BreadCrumbLinkCustom>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadCrumbLinkCustom href="#">{categories?.find((category) => category.id === categoryId)?.categoryName}</BreadCrumbLinkCustom>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="flex gap-5">

        {/* Side Categories Links */}
        <aside className="w-56 block max-lg:hidden space-y-2 mt-3">
          <p className="text-md font-semibold">Categories</p>
          <div className="px-3">
            {categories ? categories?.map((category, index) => (
              <p
                key={index}
                onClick={() => {
                  router.push(buildUrl('/products', { categoryId: category.id }));
                }}
                className={`${(category.id === categoryId) ? 'text-primary font-semibold' : "text-muted-foreground"} block cursor-pointer hover:text-primary hover:underline`}
              >
                {category.categoryName}
              </p>
            )) : (
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="w-full animate-pulse">
                  <div className="h-3 bg-gray-300 rounded-md mt-4 w-3/4"></div>
                </div>
              ))
            )}
          </div>
        </aside>

        <aside className="space-y-3 w-full">

          {/* Change category button */}
          <div className="flex justify-between items-center">
            <h1 className="text-heading">
              {categories
                ? categories?.find((category) => category.id === categoryId)?.categoryName
                : <div className="h-8 bg-gray-300 rounded-md w-44"></div>}
            </h1>
            
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
                  <DropdownMenuLabel>Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />
                  {categories?.map((category) => (
                    <DropdownMenuItem
                      key={category.id}
                      onClick={() => {
                        router.push(buildUrl('/products', { categoryId: category.id }))
                      }}
                      className={cn((category.id === categoryId) ? 'bg-primary text-white' : '')}
                    >{category.categoryName}</DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
          </div>

          {/* All products grid */}
          <div className="grid max-md:grid-cols-2 max-xl:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  w-full max-sm:gap-2 gap-4">
            {productList ? productList?.map(({ productId, weight, actualPrice, offerPrice, imgSrc, name, form, rating }: Product, index) => {
              return (
              <div
                key={index}
                onClick={() => {
                  setProgress(70)
                  router.push(buildUrl('/products/product-details',{ productId: productId, categoryId: categoryId || undefined }))
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
              )
            }) : (
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-between w-full relative p-3 border-2 rounded-md animate-pulse"
                >
                  <div className="w-full h-52 bg-gray-300 rounded-md"></div>
                  <div className="h-4 bg-gray-300 rounded-md mt-2 w-3/4"></div>
                  <div className="flex flex-row w-full justify-between mt-1">
                    <div className="h-4 bg-gray-300 rounded-md w-1/4"></div>
                    <div className="h-4 bg-gray-300 rounded-md w-1/4"></div>
                  </div>
                  <div className="flex gap-2 items-center justify-between mt-2">
                    <div className="h-6 bg-gray-300 rounded-md w-1/3"></div>
                    <div className="h-6 bg-gray-300 rounded-md w-10"></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>
      </section>
    </main>
  )
}

