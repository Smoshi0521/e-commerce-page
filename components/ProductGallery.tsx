import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faRemove, faTrash } from '@fortawesome/free-solid-svg-icons';
import Carousel from './Carousel'
function ProductGallery() {
  const product = [
    "/assets/images/image-product-1.jpg",
    "/assets/images/image-product-2.jpg",
    "/assets/images/image-product-3.jpg",
    "/assets/images/image-product-4.jpg"]

  const [currentImage, setCurrentImage] = useState("/assets/images/image-product-1.jpg")
  const [index, setIndex] = useState(0)
  const [fullView, setFullView] = useState(currentImage)
  const [openFullView, setOpenFullView] = useState(false)

  function handleNextImage(direction: string) { //Function to move to next and back image
    let currentIndex = index
    if (currentIndex >= product.length - 1 && direction === "next") {
      currentIndex = 0
      console.log("here")
      setIndex(currentIndex)
      setCurrentImage(product[currentIndex])
    }
    else if (currentIndex === 0 && direction === "back") {
      currentIndex = product.length - 1

      setIndex(currentIndex)
      setCurrentImage(product[currentIndex])
    }
    else if (direction === "next") {
      currentIndex++
      setIndex(currentIndex)
      setCurrentImage(product[currentIndex])
    }
    else if (direction === "back") {
      currentIndex--
      console.log("here")
      setIndex(currentIndex)
      setCurrentImage(product[currentIndex])
    }
  }

  {
    product.map((prod) => (
      console.log(prod)
    ))
  }

  function handleOpenFull() {
    const index = product.indexOf(currentImage)
    setFullView(product[index])
    setOpenFullView(!openFullView)
  }

  function handleMoveImage(move: string) {
    let ind = product.indexOf(fullView)
    if (index === product.length - 1 && move === "next") {
      setFullView(product[ind])
    }
    else if (index === 0 && move === "back") {
      setFullView(product[ind])
    }
    else if (move === "next") {
      ind++;
      setIndex(ind)
      setFullView(product[ind])
    }
    else if (move === "back") {
      ind--;
      setIndex(ind)
      setFullView(product[ind])
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.25 }}
        className='max-w-full flex items-center justify-center '>
        <div className='w-full md:w-fit md:flex-col items-center'>
          <Carousel>
            {
              product.map((prod) => (
                <img key={prod} src={prod} height={0} width={0} alt='' className='w-full h-full block md:hidden' />
              ))
            }
          </Carousel>
          <div className='md:flex flex-col items-center hidden gap-5 relative w-fit'>
            <img onClick={handleOpenFull} src={currentImage} className='w-[400px] cursor-pointer rounded-xl mb-3' />
            <div className='flex items-center justify-center gap-5 w-[350px]'>
              {
                product.map((prod) => (
                  <div key={prod} onClick={() => setCurrentImage(prod)}
                    className={` group flex items-center justify-center transition duration-300 hover:bg-gradient-to-r from-[#f5f5f5] to-[#ffffff] cursor-pointer rounded-xl border-2 hover:border-orange-500 ${currentImage === prod ? "border-orange-500" : ""}`}>
                    <img src={prod} height={0} width={0} alt='' className={`w-[100px] hidden md:flex rounded-lg transition duration-300 group-hover:opacity-30 ${currentImage === prod ? "opacity-30" : ""}`} />
                  </div>
                ))
              }
            </div>
          </div>
          {
            openFullView && (
              <div className='absolute h-screen w-full bg-black/80 top-0 left-0 flex items-center justify-center'>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ delay: 0.25 }}
                  className='flex flex-col relative justify-center items-center'>
                  <div className='w-[400px] flex justify-end mb-3'>
                    <button onClick={() => setOpenFullView(!openFullView)}><FontAwesomeIcon icon={faRemove} className='text-2xl transition duration-200 text-white hover:text-orange-500' /></button>
                  </div>
                  <div className='flex items-center relative mb-5 w-[430px] justify-center'>
                    <img src={fullView} className='w-[400px] rounded-xl' />
                    <div className='absolute flex justify-between w-full items-center'>
                      <button onClick={() => handleMoveImage("back")} className="bg-white transition duration-200 rounded-full w-10 h-10 flex items-center justify-center shadow-xl hover:text-orange-500">
                        <FontAwesomeIcon icon={faChevronLeft} className='text-lg' />
                      </button>
                      <button onClick={() => handleMoveImage("next")} className="bg-white transition duration-200 rounded-full w-10 h-10 flex items-center justify-center shadow-xl hover:text-orange-500">
                        <FontAwesomeIcon icon={faChevronRight} className='text-lg' />
                      </button>
                    </div>
                  </div>
                  <div className='flex items-center justify-center gap-5 w-[430px]'>
                    {
                      product.map((prod) => (
                        <div
                        key={prod}
                          className={`group flex items-center justify-center transition duration-500 bg-white rounded-xl  hover:border-orange-500 ${fullView === prod ? "border-2 border-orange-500" : ""}`}>
                          <img src={prod} height={0} width={0} alt='' className={`w-[70px] hidden md:flex rounded-xl transition duration-500 ${fullView === prod ? "opacity-30" : ""}`} />
                        </div>
                      ))
                    }
                  </div>
                </motion.div>
              </div>
            )
          }
        </div>

        {/* <div className={`w-full absolute bg-black/50 h-screen ${fullView ? "block" : "hidden"}`}>
      </div> */}
      </motion.div>
    </AnimatePresence>
  )
}

export default ProductGallery