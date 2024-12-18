'use client'

import CartItem from '@/components/CartItem'
import CustomButton from '@/components/CustomButton'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { companyAddress, supportEmail } from '@/constants/index.constants'
import { QueryParams } from '@/types/index.types'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

const CheckoutPage = () => {
  const searchParams = useSearchParams()
  const productId: string | undefined = searchParams.get('productId') as QueryParams['productId']


  const [subtotal, setSubtotal] = useState<number>(100)

  const shippingCharges: number = 123

  // Mock data remove this during production
  const cartData = {
    cartItems: [
      { productId: 'P002', quantity: 2 },
      { productId: 'P004', quantity: 2 },
      { productId: 'P006', quantity: 2 },
    ],
  }

  const cartProductDetails: { productName: string, imgSrc: string, weight: number, price: number, }[] = [
    {
        "productName": "Dehydrated Spinach",
        "imgSrc": "/useless/product-demo-img.webp",
        "weight": 100,
        "price": 85,
    },
    {
        "productName": "Dehydrated Potatoes",
        "imgSrc": "/useless/product-demo-img.webp",
        "weight": 250,
        "price": 170,
    },
    {
        "productName": "Dehydrated Onions",
        "imgSrc": "/useless/product-demo-img.webp",
        "weight": 200,
        "price": 125,
    }
]

  // setSubtotal(cartProductDetails.map((item) => item.price).reduce((accumulator, current) => accumulator + current))

  return (
    <main className='container-x-padding space-y-3'>
      
      {/* Breadcrumbs */}
      <div>
        <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                  <BreadcrumbLink href="/" >Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Checkout</BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
      </div>

      <section className='flex gap-4 lg:flex-row flex-col'>

        <div className='space-y-4 w-full'>
          {/* Review Items Section */}
          <div className="border-2 rounded-md p-4 space-y-4">
            <h1 className='text-xl font-medium'>Review Cart and Shipping</h1>

            {/* Products List */}
            <div className='flex flex-col gap-3'>
              {cartProductDetails.map((item, index) => (
                <CartItem
                  key={index}
                  product={{
                    imgSrc: item.imgSrc,
                    name: 'Dehydrated Potatoes',
                    weight: 100,
                    actualPrice: 130,
                    offerPrice: 100,
                  }}
                  quantity={0} />
              ))}
            </div>
          </div>

          {/* User Details */}
          <div className="border-2 rounded-md p-4">
            <div className='flex justify-between'>
              <h1 className='text-xl font-medium'>Delivery Information</h1>
              <CustomButton
                onClick={function (): void {
                throw new Error('Function not implemented.')
                }}
                variant={'active'}
                label='Edit'
              />
            </div>
            {companyAddress.map((item, index) => {
              return <p key={index} className='text-muted-foreground'>{item}</p>
            })}
            <p className='text-muted-foreground'>{supportEmail}</p>

          </div>
        </div>

        {/* Order Summery */}
        <aside className="border-2 rounded-md p-4 lg:min-w-96 space-y-3">
          <h1 className='text-xl font-medium'>Order Summery</h1>
          <Separator />
          
          <div className='flex justify-between px-3'>
            <p className='text-sm text-muted-foreground'>Subtotal</p>
            <p className='text-sm text-muted-foreground'>{subtotal}</p>
          </div>

          <div className='flex justify-between px-3'>
            <p className='text-sm text-muted-foreground'>Shipping charges</p>
            <p className='text-sm text-muted-foreground'>{shippingCharges}</p>
          </div>
          
          <Separator />
          <div className='flex justify-between px-3'>
            <p className='font-medium'>Total</p>
            <p className='font-medium'>
              {shippingCharges + subtotal}
            </p>
          </div>

          <h1 className='text-xl font-medium'>Payment Details</h1>
          <Separator />

          <div>
            <p>Cash on delivery</p>
            <div className='flex items-center gap-2'>
              <p>Pay online</p>
              <p className='text-sm text-muted-foreground'>(with RazorPay)</p>
            </div>
            <div className='flex items-center gap-2'>
              <p>Pay online</p>
              <p className='text-sm text-muted-foreground'>(with CashFree)</p>
            </div>
          </div>

          <Button
            onClick={() => {

            }}
            className='w-full'
          >
            Pay &#8377; {shippingCharges + subtotal}
          </Button>
        </aside>
      </section>
    </main>
  )
}

export default CheckoutPage