'use client'

import CustomButton from '@/components/CustomButton'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { companyAddress, supportEmail } from '@/constants/index.constants'
import { buildUrl } from '@/lib/utils'
import Image from 'next/image'
import { useRouter, } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { cartProductDetails } from '@/constants/mock-data'

const CheckoutPage = () => {
  
  const router = useRouter()

  const [subTotal, setSubTotal] = useState<number>(0)
  const [discountTotal, setDiscountTotal] = useState<number>(0)
  const [grandTotal, setGrandTotal] = useState<number>(0)
  const [progress, setProgress] = useState<number>(0)

  const shippingCharges: number = 123
  
  useEffect(() => {
    const subTotal = cartProductDetails
      .map((item) => item.actualPrice * item.quantity)
      .reduce((accumulator, current) => accumulator + current, 0);
  
    const discountTotal = cartProductDetails
      .map((item) => (item.actualPrice - item.offerPrice) * item.quantity)
      .reduce((accumulator, current) => accumulator + current, 0);
  
    const grandTotal = subTotal - discountTotal + shippingCharges;
  
    // Update state for all totals
    setSubTotal(subTotal);
    setDiscountTotal(discountTotal);
    setGrandTotal(grandTotal);
  }, [shippingCharges]);

  return (
    <main className='container-x-padding space-y-3'>

      {/* New page loading progress */}
      <Progress value={progress} className="fixed inset-0 z-50 w-full rounded-none h-1"/>
      
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
              {cartProductDetails.map((item) => {

                const { imgSrc, productId, weight, actualPrice, offerPrice, quantity, productName } = item

                return (
                    <div key={productId} className='flex'>
                        <div
                          className='flex-1 border-2 p-3 rounded-l-md flex items-center max-sm:items-start  flex-col sm:flex-row justify-between gap-2 cursor-pointer'
                          onClick={() => {
                            setProgress(70)
                            router.push(buildUrl('/products/product-details', { productId: productId}))
                          }}
                        >
                            <div className='flex gap-3'>
                                <Image
                                src={imgSrc}
                                alt={productName}
                                height={100}
                                width={100}
                                />
                                <div>
                                    <p className='text-xl '>{productName}</p>
                                    <p className='text-sm text-muted-foreground'>{weight}g</p>
                                    <div className="flex gap-2 items-center mt-3">
                                        <p className="text-2xl">&#8377; {offerPrice}</p>
                                        <div className="flex gap-1">
                                            <p className="line-through text-muted-foreground">{actualPrice}</p>
                                            <p className="text-green-600 font-medium">{((actualPrice-offerPrice) / actualPrice * 100).toPrecision(2)}% off</p>
                                        </div>  
                                    </div>
                                </div>
                            </div>               
                            <div className='flex flex-row gap-1 items-center'>
                                <p className='text-muted-foreground'>Quantity:</p>
                                <div className='flex gap-3 items-center '>
                                  <Image
                                      src='/remove.svg'
                                      alt='add icon'
                                      className='size-5 border-[1px] border-primary rounded-sm cursor-pointer select-none'
                                      height={12}
                                      width={12}
                                      onClick={(event) => {
                                        event.stopPropagation()

                                      }}
                                  />
                                  <p className='text-xl'>{quantity}</p>
                                  <Image
                                      src='/add.svg'
                                      alt='add icon'
                                      className='size-5 border-[1px] border-primary rounded-sm cursor-pointer select-none'
                                      height={12}
                                      width={12}
                                      onClick={(event) => {
                                        event.stopPropagation()

                                      }}
                                  />
                            </div>
                          </div>
                          
                      </div>
                    <div
                      onClick={() => {

                      }}
                      className='flex select-none items-center px-2 rounded-r-md bg-slate-200 cursor-pointer'>
                          <Image
                            src='/delete.svg'
                            height={24}
                            width={24}
                            alt='delete icon'
                          />
                        </div>
                    </div>
                  )})}
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
        <aside className="border-2 h-fit rounded-md p-4 lg:min-w-96 space-y-3">
          <h1 className='text-xl font-medium'>Order Summery</h1>
          <Separator />
          
          <div className='flex justify-between px-3'>
            <p className='text-sm text-muted-foreground'>Subtotal</p>
            <p className='text-sm text-muted-foreground'>{subTotal}</p>
          </div>

          <div className='flex justify-between px-3'>
            <p className='text-sm text-muted-foreground'>Shipping charges</p>
            <p className='text-sm text-muted-foreground'>{shippingCharges}</p>
          </div>

          <div className='flex justify-between px-3'>
            <p className='text-sm text-muted-foreground'>Total Discount</p>
            <p className='text-sm text-muted-foreground'>- {discountTotal}</p>
          </div>
          
          <Separator />

          <div>
            <div className='flex justify-between px-3'>
              <p className='font-medium text-sm'>Grand Total</p>
              <p className='font-medium text-sm'>
                {grandTotal}
              </p>
            </div>
          </div>

          <Separator />

          <Button
            onClick={() => {

            }}
            className='w-full'
          >
            Pay &#8377; {grandTotal}
          </Button>

          <p className='text-sm text-muted-foreground'>* After clicking the button you&apos;ll be redirected to our payment gateway page to procced with payment process.</p>
          
        </aside>
      </section>
    </main>
  )
}

export default CheckoutPage