'use client'

import Image from 'next/image'
import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'

const formSchema = z.object({
  email: z.string().email('Please enter valid email'),
  password: z.string().min(8, 'Must be atleast 8 characters long'),
  rememberMe: z.boolean().default(false).optional(),
})

const SignInPage = () => {
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <aside className='min-w-[500px] min-h-fit flex flex-col justify-center p-10 gap-2 overflow-y-auto remove-scrollbar'>
        <Link href="/">
          <Image
              src='/assets/logo.svg'
              height={34}
              width={100}
              alt='logo'
          />
      </Link>
      
        <h1 className='text-4xl font-bold text-primary'>Sign in into your Account</h1>
        <h6 className='text-md text-muted-foreground'>Welcome back! choose your prefred way of sing in:</h6>
        
        <Button variant='outline' className='w-full text-primary border-2 mt-5'>
          <Image src='/google-logo-color.svg' height={24} width={24} alt='google logo' /> Google
        </Button>

        <div className='flex items-center justify-around gap-3 w-full'>
          <Separator className='w-24'/>
          <p className='text-center text-muted-foreground text-sm w-fit'>or sign in with email</p>
          <Separator className='w-24'/>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 flex flex-col">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} className='border-2'/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder="m33^dg%$" {...field} className='border-2'/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-between'>
              <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className='flex items-center gap-1'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className='mt-[4px]'
                        />
                      </FormControl>
                        <FormLabel className='cursor-pointer'>
                          Remember me
                        </FormLabel>
                    </FormItem>
                  )}
              />
              
              <Link href='#' className='underline text-primary self-end'>Forgot password?</Link>
            </div>
            <Button type="submit" className='w-full text-white '>Sign in</Button>
          </form>
        </Form>
        <p className='self-center mt-10'>Dont have account? <Link href='/sign-up' className='text-secondary underline'>Create an account</Link></p>
      </aside>
  )
}

export default SignInPage