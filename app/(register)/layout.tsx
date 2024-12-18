import Image from "next/image"

export default function RegisterLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <main className='flex justify-center h-screen max-h-screen'>

        <section className="h-full w-full max-md:hidden">
          <div className="fixed h-screen p-10 w-[calc(100%-500px)]">
            <Image src="/useless/product-demo-img.webp" height={120} width={200} alt="" className="rounded-md absolute z-10 right-16 top-5 max-xl:hidden"/>
              <Image
                priority
                src="/assets/hero-image.webp"
                height={1000}
                width={1000}
                alt="Hero Image"
                className="rounded-md size-full object-cover"
              />
            <Image src="/useless/Dehydrated vegetables.jpg" height={140} width={200} alt="" className="rounded-md absolute z-10 left-5 bottom-5 max-xl:hidden"/>
          </div>
        </section>
        
        {children}
        
    </main>
    )
  }