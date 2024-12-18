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
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const formSchema = z.object({
  firstName: z.string().min(3,'must be longer than 3 characters').max(20),
  lastName: z.string().min(3,'must be longer than 3 characters').max(20),
  email: z.string().email('Please enter valid email'),
  password: z.string().min(8, 'Must be atleast 8 characters long'),
  confirmPassword: z.string(),
  phone: z
    .string()
    .regex(/^\+?[0-9\s-]{10,15}$/, "Invalid phone number format"),
  receiveUpdates: z.boolean().default(false).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords must match',
})

const SignUpPage = () => {
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      receiveUpdates: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <aside className='min-w-[500px] max-w-[500px] min-h-fit flex flex-col justify-center p-10 gap-2 '>
        <Link href="/">
          <Image
              src='/assets/logo.svg'
              height={34}
              width={100}
              alt='logo'
          />
      </Link>
        <h1 className='text-4xl font-bold text-primary'>Create your Account</h1>
        <h6 className='text-md text-muted-foreground'>Welcome! choose your prefred way of sing up:</h6>
        
        <Button variant='outline' className='w-full text-primary border-2 mt-5'>
          <Image src='/google-logo-color.svg' height={24} width={24} alt='google logo' /> Continue with Google
        </Button>

        <div className='flex items-center justify-around gap-3 w-full'>
          <Separator className='w-24'/>
          <p className='text-center text-muted-foreground text-sm'>or sing up with email</p>
          <Separator className='w-24'/>
        </div>

        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 flex flex-col">
          
          <div className='flex gap-5'>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} className='border-2'/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} className='border-2'/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
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

          <div className='flex gap-5'>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder="m33^dg%$" {...field} className='border-2'/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder="m33^dg%$" {...field} className='border-2'/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
            
          <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>phone</FormLabel>
                  <FormControl>
                    <PhoneInput
                      country='in'
                      placeholder='12334 12343'
                      value={field.value}
                      onChange={field.onChange}
                      inputStyle={{
                        width: '100%',
                        border: '2px solid hsl(0 0% 89.8%)',
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
          />

              <FormField
                  control={form.control}
                  name="receiveUpdates"
                  render={({ field }) => (
                    <FormItem className='flex items-center gap-2'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className='mt-[4px]'
                        />
                      </FormControl>
                        <FormLabel className='cursor-pointer'>
                        Do you want to receive updates about new products arrival, offers, etc. on mentioned phone or email.
                        </FormLabel>
                    </FormItem>
                  )}
              />
            
            <Button type="submit" className='w-full text-white '>Sign in</Button>
          </form>
        </Form>
        <p className='self-center mt-10'>Already have an account? <Link href='/sign-in' className='text-secondary underline'>Sign in</Link></p>
      </aside>
  )
}

export default SignUpPage