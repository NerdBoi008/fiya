import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"

export default function MainLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
  
    return (
      <section className="space-y-3">
          <Navbar />
          {children}
          <Footer />
        </section>
    )
  }