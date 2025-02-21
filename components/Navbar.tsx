'use client'

import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LogOutIcon, User2Icon, } from 'lucide-react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
// import { cartProductDetails, popularProductsData } from '@/constants/mock-data';
import { useRouter } from 'next/navigation';
import { buildUrl } from '@/lib/utils';
import CustomButton from './CustomButton';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Product, User } from '@/types/index.types';
import { Button } from './ui/button';
import { getSignedInUser, signOut } from '@/lib/appwrite/server/user.actions';
import useCartStore from '@/lib/store/cartStore';
import useDataStore from '@/lib/store/dataStore';

const Navbar = () => {

  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<{ productName: string, productId: string, productImage: string }[]>();
  const router = useRouter();

  const [products, setProducts] = useState<Product[] | null>();

  const [cartItemsCount, setCartItemsCount] = useState<number>(0);
  const [signedInUser, setSignedInUser] = useState<User | null>(null);

  const { cart } = useCartStore();

  const { products: productsApi, fetchProducts } = useDataStore();

  useEffect(() => {
    if (!productsApi) fetchProducts();

    if (productsApi) setProducts(productsApi);

  }, [productsApi, fetchProducts]);

  useEffect(() => {
    const fetchUser = async () => {
      const signedInUser = await getSignedInUser();
      setSignedInUser(signedInUser)
    };

    fetchUser();
    
  }, [])

  useEffect(() => {
    setCartItemsCount(cart.length);
  }, [cart.length, cartItemsCount])
  
  

  function onSubmit({ searchQuery }: { searchQuery: string }) {
    
    // Searches product from products array
    setSearch(products?.filter((product) => {
      return product.name.includes(searchQuery)
    }).map((item) => {
      return {
        productName: item.name,
        productId: item.productId,
        productImage: item.imgSrc,
      }
    }))
    
    if (searchQuery === 'Enter') {
      setIsSearchDialogOpen(false)
    }
  }

  const handleSignOut = async () => {
    try {
      const isSignedOut = await signOut();
      if (isSignedOut) {
        setSignedInUser(null) 
      }
    } catch (error) {
      console.error('Sign-out failed:', (error instanceof Error ? error.message : 'An unknown error occurred'));
      alert('Failed to sign out. Please try again.');
    }
  };

  return (
    <nav className='sticky top-0 z-50 bg-white h-16 flex items-center justify-between container-x-padding'>

      <Link href="/">
        <Image
            src='/assets/logo.svg'
            height={80}
            width={80}
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
              <Input
                onKeyDown={(event) => {
                  onSubmit({ searchQuery: event.key })
                }}
                placeholder="i.e. Dry fruits, Dehydrated oranges, ..."
              />
              <ScrollArea className='h-full pb-10'>
                {search?.map((product, index) => (
                  <div
                    key={index}
                    className='cursor-pointer mb-3'
                  >
                    <div className='flex gap-3'>
                      <Image
                        src={product.productImage}
                        height={56}
                        width={56}
                        alt={product.productName}
                        className='size-10 object-cover'
                      />
                      <p
                        className='mt-2'
                        onClick={() => {
                          setIsSearchDialogOpen(false)
                          router.push(buildUrl('/products/product-details', { search: product.productId }))
                        }}
                      >{product.productName}</p>
                    </div>
                    <Separator />
                  </div>
                ))}
              </ScrollArea>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Cart Button */}
        <div className='relative'>
          <CustomButton
              leadingIcon='/cart.svg'
            onClick={() => {
                router.push('/checkout')
              }}
              variant={'outline'}
              classNames='border-none'
          />
            {(cartItemsCount >= 1) && (
              <div className='absolute -right-1 -top-2 bg-red-700 p-1 rounded-full'>
                {(cartItemsCount <= 9) ?
                (<p className='text-white text-sm leading-none'>{cartItemsCount}</p>) :
                (<p className='text-white leading-none'>9+</p>)} 
              </div>
            )}
        </div>
        
        {(signedInUser) ? (
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
              <DropdownMenuItem
                onClick={() => {
                  router.push('/profile')
                }}
                className='cursor-pointer'
                >
                <User2Icon/>
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className='cursor-pointer'
                onClick={handleSignOut}
              >
                <LogOutIcon/>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent> 
        </DropdownMenu>
        ) : (
            <Button
              onClick={() => {
                router.push('/sign-in')
              }}
            >
              Sing in
            </Button>
        )}
      </div>
    </nav>
  )
}

export default Navbar