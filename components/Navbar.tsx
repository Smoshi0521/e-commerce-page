import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faRemove, faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { orange } from '@/styles/colorDesign';
import { AnimatePresence, motion } from 'framer-motion';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';
function Navbar() {
  const [openNav, setOpenNav] = useState(false)
  const [openCart, setOpenCart] = useState(false)
  const [cartList] = useCollection(collection(db, 'user', 'dummyUser', 'cart'))
  const [cartLength, setCartLength] = useState(0)

  useEffect(() => {
    let quantity = 0
    cartList?.docs.map((list) => {
      quantity += list.data().quantity;
    })
    setCartLength(quantity)
  }, [cartList])

  async function handleDelete(id: string) {
    await deleteDoc(doc(db, 'user', 'dummyUser', 'cart', id))
  }
  return (
    <nav className='flex items-center w-full lg:w-[80rem] border justify-between border-b-gray-300 border-transparent relative'>
      <div className='flex items-center w-full justify-start gap-0 pl-5 md:pl-0 h-16 md:h-24'>
        <button onClick={() => setOpenNav(!openNav)} aria-labelledby="Navigation" className='flex items-center relative top-0 border-black'><FontAwesomeIcon icon={faBars} className='text-xl md:hidden' /> </button>
        <h1 className='font-bold text-[30px] ml-3 md:mr-10 relative top-[-2px] cursor-default'>sneakers</h1>
        <ul className='hidden md:flex items-center gap-5 h-full'>
          <li className='transition duration-200 border-[3px] hover:border-b-orange-500 border-transparent h-full flex items-center'>
            <Link href="">Collections</Link>
          </li>
          <li className='transition duration-200 border-[3px] hover:border-b-orange-500 border-transparent h-full flex items-center'>
            <Link href="">Men</Link>
          </li>
          <li className='transition duration-200 border-[3px] hover:border-b-orange-500 border-transparent h-full flex items-center'>
            <Link href="">Women</Link>
          </li>
          <li className='transition duration-200 border-[3px] hover:border-b-orange-500 border-transparent h-full flex items-center'>
            <Link href="">About</Link>
          </li>
          <li className='transition duration-200 border-[3px] hover:border-b-orange-500 border-transparent h-full flex items-center'>
            <Link href="">Contact</Link>
          </li>
        </ul>
      </div>
      <div id={"Navigation"} className={openNav ? "fixed top-0 w-full h-screen backdrop-blur-xl z-10" : "z-10"}>
        <div className={`duration-300 ease-in w-[60%] sm:w-[50%] md:[45%] ${openNav ? "fixed top-0 left-0 bg-white h-screen w-[200px] px-5" : "fixed top-0 left-[-100%] bg-white h-screen w-[200px] px-5"}`}>
          <div className='py-5 mb-2'>
            <button onClick={() => setOpenNav(!openNav)}><FontAwesomeIcon icon={faRemove} className='text-lg' /></button>
          </div>
          <ul className='flex flex-col md:hidden items-start gap-5'>
            <li>
              <Link href="" className='font-bold'>Collections</Link>
            </li>
            <li>
              <Link href="" className='font-bold'>Men</Link>
            </li>
            <li>
              <Link href="" className='font-bold'>Women</Link>
            </li>
            <li>
              <Link href="" className='font-bold'>About</Link>
            </li>
            <li>
              <Link href="" className='font-bold'>Contact</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className='flex items-center gap-5 mr-5 md:mr-0'>
        <div
          className='relative'>
          <button aria-labelledby="CartList" onClick={() => setOpenCart(!openCart)}><FontAwesomeIcon icon={faShoppingCart} className='text-md md:text-xl' /></button>
          <AnimatePresence>
            {
              cartLength !== 0 && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ delay: 0.25 }}
                  className='text-white w-4 h-3 text-center text-[9px] rounded-full absolute top-[-5px] right-[-5px] font-bold' style={{ backgroundColor: orange }}>
                  {cartLength}
                </motion.p>
              )
            }
          </AnimatePresence>
        </div>
        <button className='transition duration-300 border-2 hover:border-orange-500 rounded-full w-10 h-10 md:w-12 md:h-12'><img alt="profilePic" src='/assets/images/image-avatar.png' className='w-full' /></button>
      </div>

      <AnimatePresence>
        {
          openCart && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ delay: 0.25 }}
              id={"CartList"}
              className={`bg-white absolute right-2 md:right-0 top-[70px] md:top-20 flex flex-col w-[95%] md:w-[340px] drop-shadow-2xl rounded-lg z-20`}>
              <p className='h-16 flex items-center border border-b-gray-300 border-transparent px-5 rounded-t-xl font-bold'>Cart</p>
              <div className='flex flex-col p-5 gap-5'>
                {
                  cartList?.docs.length === 0 ?
                    <div className='flex items-center justify-center h-[100px]'>
                      <p className='text-gray-500 font-semibold text-sm'>Your cart is empty.</p>
                    </div>
                    :

                    cartList?.docs.map((list) => (
                      <div key={list.id} className='flex items-center'>
                        <img alt="productImage" src='/assets/images/image-product-1.jpg' className='w-[50px] rounded-lg mr-2' />
                        <div className='flex flex-col gap-1 w-full'>
                          <p className='text-gray-500 text-sm'>{list.data().name}</p>
                          <div className='flex items-center gap-2'>
                            <p className='text-gray-500 text-sm'>{`$${list.data().cost}.00 x ${list.data().quantity}`}</p>
                            <p className='font-bold text-sm'>{`$${list.data().quantity * list.data().cost}.00`}</p>
                          </div>
                        </div>
                        <button aria-label="Delete" onClick={() => handleDelete(list.data().id)}><FontAwesomeIcon icon={faTrash} className='text-sm text-gray-400 hover:text-red-500 transition duration-200' /></button>
                      </div>
                    ))
                }
                {
                  cartList?.docs.length !== 0 && (
                    <button aria-label="Checkout" className='w-full py-3  text-white font-medium rounded-lg transition duration-200 bg-orange-500 hover:bg-orange-300' >Checkout</button>
                  )
                }
              </div>
            </motion.div>
          )
        }
      </AnimatePresence>
    </nav >

  )
}

export default Navbar