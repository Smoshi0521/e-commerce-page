import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
function Carousel({ children: slides }: any) {
  const [currentImage, setCurrentImage] = useState("image-product-1.jpg")
  const [index, setIndex] = useState(0)
  const [fullView, setFullView] = useState(false)
  const [current, setCurrent] = useState(0)
  // function handleNextImage(direction: string) { //Function to move to next and back image
  //   let currentIndex = index
  //   if (currentIndex >= product.length - 1 && direction === "next") {
  //     currentIndex = 0
  //     console.log("here")
  //     setIndex(currentIndex)
  //     setCurrentImage(product[currentIndex])
  //   }
  //   else if (currentIndex === 0 && direction === "back") {
  //     currentIndex = product.length - 1

  //     setIndex(currentIndex)
  //     setCurrentImage(product[currentIndex])
  //   }
  //   else if (direction === "next") {
  //     currentIndex++
  //     setIndex(currentIndex)
  //     setCurrentImage(product[currentIndex])
  //   }
  //   else if (direction === "back") {
  //     currentIndex--
  //     console.log("here")
  //     setIndex(currentIndex)
  //     setCurrentImage(product[currentIndex])
  //   }
  // }

  function prev() {
    setCurrent(current => current === 0 ? slides.length - 1 : current - 1)
  }
  function next() {
    setCurrent(current => current === slides.length - 1 ? 0 : current + 1)
  }
  return (
    <div className='flex items-center overflow-hidden relative'>
      <div className='flex transition-transform ease-out'
        style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides}
      </div>
      <div className='absolute flex justify-between w-full px-5 '>
        <button className="bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-xl" onClick={prev}>
          <Image src={"/assets/images/icon-previous.png"} height={8} width={8} alt='' style={{ width: "auto", height: "auto" }} />
        </button>
        <button className="bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-xl" onClick={next}>
          <Image src={"/assets/images/icon-next.png"} height={8} width={8} alt='' style={{ width: "auto", height: "auto" }} />
        </button>
      </div>
      <div className='absolute bottom-2 flex justify-center items-center w-full gap-1'>
        {
          slides.map((_: any, i: number) => (
            <div key={i} className={`h-3 w-3 rounded-full bg-white transition-all duration-200 ${current === i ? "p-2" : "bg-opacity-50 p-1"} `} />
          ))
        }
      </div>
    </div>
  )
}

export default Carousel