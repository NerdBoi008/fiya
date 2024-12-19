import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className="flex flex-col gap-4 flex-1 items-center min-h-screen justify-center container-x-padding">
        <Image
          src={'/assets/logo.svg'}
          alt={'brand logo'}
          height={100}
          width={100}
          priority
        />
      <div>
        <Image
          src={'/assets/not-found.jpg'}
          alt={'not found image'}
          height={300}
          width={300}
          priority
        />
      </div>
      <div className='flex flex-col items-center'>
        <h1 className="text-4xl font-bold text-gray-800">404</h1>
        <p className="text-lg text-gray-600">Oops! The page or items you&apos;re looking for does not exist.</p>
        <p className='text-muted-foreground text-sm'>please click button below to go back to home page</p>
        <Link href={'/'} className="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-blue-600">
          Take me to home
        </Link>
      </div>
    </div>
  )
}

export default NotFound