import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
type Props = {
  setCurrentImage: React.Dispatch<React.SetStateAction<string>>

}

function DesktopImage({ children: product, setCurrentImage }: any) {
  const [view, setView] = useState(false)

  return (
    <div  className={` group flex items-center justify-center transition duration-300 hover:bg-gradient-to-r from-[#f5f5f5]  to-[#ffffff] cursor-pointer rounded-xl border-2 hover:border-orange-500 `}>
      {product}
    </div>
  )
}

export default DesktopImage