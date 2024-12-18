import { companyAddress, footerLinks, policyLinks, supportEmail } from '@/constants/index.constants';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
      <footer className='space-y-3 pt-10'>
          <section className='container-x-padding flex justify-between'>
              <div className='w-full'>
                <Image
                    src='/assets/logo.svg'
                    height={34}
                    width={100}
                    alt='logo'
                  />
                  {companyAddress.map((value) => 
                      <p key={value} className='text-muted-foreground'>{value}</p>
                  )}
                  <Link href={`mailto:${supportEmail}`} className='underline mt-14'>{supportEmail}</Link>
              </div>

              <div className='flex w-full justify-between max-md:flex-col max-md:items-end gap-5'>
                  {footerLinks.map((obj, index) => (
                      <div key={index} className=''>
                          <h6 className='text-lg font-semibold text-primary max-md:text-end' >{obj.heading}</h6>

                          <div className='flex flex-col'>
                              {obj.links.map((links, index) => (
                                  <Link key={index} href={links.href} className='text-muted-foreground max-md:text-end'>{links.linkName}</Link>
                              ))}
                          </div>
                          
                      </div>
                  ))}
              </div>

          </section>

          <div className='bg-primary container-x-padding flex justify-between py-3 gap-5'>
              <p className='text-white'>&copy; 2024 Fiya production</p>
              <aside className='flex flex-row gap-3 max-md:flex-col'>
                  {policyLinks.map((links, index) => (
                      <Link key={index} href={links.link} className='text-white max-md:text-end'>{links.name}</Link>
                  ))}
              </aside>
          </div>
    </footer>
  )
}

export default Footer