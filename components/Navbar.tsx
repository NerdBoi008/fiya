'use client'

import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LogOutIcon, User2Icon, } from 'lucide-react';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { popularProductsData } from '@/constants/mock-data';
import { useRouter } from 'next/navigation';
import { buildUrl } from '@/lib/utils';
import CustomButton from './CustomButton';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';


const Navbar = () => {

  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState<boolean>(false)
  const [search, setSearch] = useState<{productName: string, productId: string}[]>()
  const router = useRouter()

  function onSubmit({ searchQuery }: { searchQuery: string }) {
    
    setSearch(popularProductsData.filter((product) => product.name.includes(searchQuery)).map((item) => { return {productName: item.name, productId: item.productId} }))
    
    if (searchQuery === 'Enter') {
      setIsSearchDialogOpen(false)
    }
  }

  return (
    <nav className='sticky top-0 z-50 bg-white h-16 flex items-center justify-between container-x-padding'>

      <Link href="/">
        <Image
            src='/assets/logo.svg'
            height={34}
            width={100}
            alt='logo'
        />
      </Link>
          
      <div className='flex flex-row gap-5 items-center'>

        {/* Search Button */}
        <Dialog open={isSearchDialogOpen} onOpenChange={setIsSearchDialogOpen}>
          <DialogTrigger asChild>
            <CustomButton
              leadingIcon='/search.svg'
              onClick={() => {}}
              variant={'outline'}
              classNames='border-none'
            />
          </DialogTrigger>
          <DialogContent className='overflow-hidden '>
            <DialogHeader>
              <DialogTitle>What are you searching for ...</DialogTitle>
              <DialogDescription className='hidden'>
                This dailog is for searching your products like dry fruits, dehydrated flakes and so on.
              </DialogDescription>
            </DialogHeader>
            <div className='h-72 space-y-3'>
              <Input onKeyDown={(event) => { onSubmit({ searchQuery: event.key }) }} placeholder="i.e. Dry fruits, Dehydrated oranges, ..." />
              <ScrollArea className='h-full pb-10'>
                {search?.map((product, index) => (
                  <div key={index} className='cursor-pointer'>
                    <p
                      className='mt-2'
                      onClick={() => {
                      setIsSearchDialogOpen(false)
                      router.push(buildUrl('/products/product-details', { search: product.productId }))
                      }}
                    >{product.productName}</p>
                    <Separator />
                  </div>
                ))}
              </ScrollArea>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Cart Button */}
        <Drawer>
          <DrawerTrigger asChild>
          <CustomButton
              leadingIcon='/cart.svg'
              onClick={() => {
                
               }}
              variant={'outline'}
              classNames='border-none'
            />
          </DrawerTrigger>
          <DrawerContent>
            <div className='container-x-padding'>
              <DrawerHeader className='p-0'>
                <DrawerTitle>Cart</DrawerTitle>
                <DrawerDescription>Your all products are stored in cart</DrawerDescription>
              </DrawerHeader>
              <p>this is test</p>
            </div>
            <DrawerFooter>
              <DrawerClose>
                <p>Close</p>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        
        {/* Avatar button */}
        <DropdownMenu>
          <DropdownMenuTrigger className='cursor-pointer group' asChild>
            <div className='flex flex-row items-center' >
              <Avatar >
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className='mx-1 group-hover:translate-y-0.5 transition-all'>
              <Image
                src='/arrow-down.svg'
                height={12}
                width={12}
                  alt='logo'
                />
            </span>
            </div>
            
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User2Icon/>
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOutIcon/>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent> 
      </DropdownMenu>
      </div>
    </nav>
  )
}

export default Navbar