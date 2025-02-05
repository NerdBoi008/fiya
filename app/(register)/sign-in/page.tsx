'use client'

import Image from 'next/image'
import React, { useState } from 'react'
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
import Link from 'next/link'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import CustomInput from '@/components/CustomInput'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, LoaderCircleIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn } from '@/lib/appwrite/server/user.actions'


const formSchema = z.object({
  email: z.string().email('Please enter valid email').trim(),
  password: z
  .string()
  .min(8, { message: 'Be at least 8 characters long' })
  .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
  .regex(/[0-9]/, { message: 'Contain at least one number.' })
  .regex(/[^a-zA-Z0-9]/, {
    message: 'Contain at least one special character.',
  })
  .trim(),
  rememberMe: z.boolean().default(false),
})



const SignInPage = () => {

  const router = useRouter()
  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordInputProps, setPasswordInputProps] = useState<{type: 'password' | 'text', trailingIconSrc: string}>({trailingIconSrc: '/visibility.svg', type: 'password'});
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit({ email, password, rememberMe }: z.infer<typeof formSchema>) {

    setLoading(true);
    setError(null);

    try {
      
      const isSignedIn = await signIn(email, password, rememberMe);

      if (isSignedIn) {
        router.push('/');
      }
     
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
      
  }
  
  return (
    <aside className='md:min-w-[500px] min-h-fit flex flex-col justify-center p-5 gap-2 overflow-y-auto remove-scrollbar'>
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
      
      {error && (
        <Alert variant={'destructive'}>
          <InfoIcon />
          <AlertTitle className='hidden'>Error!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 flex flex-col">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                  <CustomInput
                      field={field}
                      leadingIconSrc='/mail.svg'
                      type='text'
                      placeholder="example@email.com"
                    />
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
                    <CustomInput
                      field={field}
                      leadingIconSrc='/password.svg'
                      type={passwordInputProps.type}
                      placeholder="m33^dg%$"
                      trailingIconSrc={passwordInputProps?.trailingIconSrc}
                      trailingAction={() => {
                        setPasswordInputProps(
                          (passwordInputProps.type === 'password') ?
                            {
                              trailingIconSrc: '/visibility_off.svg',
                              type: 'text'
                            } : {
                              trailingIconSrc: '/visibility.svg',
                              type: 'password'
                            }
                        )
                      }}
                    />
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
          <Button type="submit" className='w-full text-white ' disabled={loading}>
            {loading ? (
              <div className='flex gap-3'>
                <LoaderCircleIcon className='animate-spin'/>
                <p>Siging in...</p>
              </div>
            ): (
                <p>Sing in</p>
            )}
            </Button>
          </form>
        </Form>
        <p className='self-center mt-10'>Don&apos;t have account? <Link href='/sign-up' className='text-secondary underline'>Create an account</Link></p>
      </aside>
  )
}

export default SignInPage