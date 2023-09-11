import Image from 'next/image'
import { Inter } from 'next/font/google'
import AddCart from '@/components/AddCart'
import ProductGallery from '@/components/ProductGallery'
import Description from '@/components/Description'
import Navbar from '@/components/Navbar'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`w-full md:gap-5 flex flex-col items-center md:justify-center overflow-x-hidden m-0 p-0 `}>
      <div className='w-full flex justify-center md:px-[50px] lg:px-[200px]'>
        <Navbar />
      </div>
      <div className='flex flex-col md:flex-row md:items-center md:justify-center max-w-[1200px] gap-5 lg:gap-28 md:px-[50px] lg:px-[100px] md:py-14'>
        <ProductGallery />
        <Description />
      </div>
    </main>
  )
}
