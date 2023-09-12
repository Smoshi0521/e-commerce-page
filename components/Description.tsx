import React from 'react'
import { orange, paleOrange } from '@/styles/colorDesign'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
function Description() {
  const [quantity, setQuantity] = useState(0)
  const [cartList, setCartList] = useState([])
  const sneaker = {
    id: "fall",
    name: "Fall Limited Edition Sneakers",
    description: "These low-profile sneaker are your perfect casual wea compananion.Feauturing a durable rubber outer sole. they'll withstand everything the weather can offer.",
    cost: 250.00,
    discount: 0.50,
    discountString: "50%",
  }
  const [sameProdQty] = useCollection(collection(db, 'user', 'dummyUser', 'cart'))

  function handleAddMinus(option: string) {
    let current = quantity;
    if (quantity === 0 && option === "minus") {
      setQuantity(current)
    }
    else if (option === "add") {
      current++;
      setQuantity(current)
    }
    else if (option === "minus") {
      current--;
      setQuantity(current)
    }
  }
  async function addCart(id: string) { // Get the current quantity of the same product in cart and add the new quantity else add the new quantity
    let currentQty = 0
    sameProdQty?.docs.map((data) => {
      if (data.data().id === 'fall') {
        currentQty = data.data().quantity ? currentQty + data.data().quantity : 1
      }
    })
    await setDoc(doc(db, 'user', 'dummyUser', 'cart', 'fall'), {
      id: id,
      name: sneaker.name,
      cost: sneaker.cost * sneaker.discount,
      quantity: quantity + currentQty
    })
  }
  console.log(quantity === 0)
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.25 }}
        className='flex flex-col w-full gap-5 p-5'>
        <h2 className={`text-sm font-semibold tracking-widest`} style={{ color: orange }}>SNEAKER COMPANY</h2>
        <h1 className='font-semibold text-[30px] md:text-[40px]'>{sneaker.name}</h1>
        <p className='text-left text-gray-500'>{sneaker.description}</p>
        <div className='flex items-center justify-between md:flex-col md:items-start w-full'>
          <div className='flex items-center gap-3'>
            <p className='font-bold text-2xl'>{`$${sneaker.cost * sneaker.discount}.00`}</p>
            <p className="px-2 rounded-md" style={{ color: orange, backgroundColor: paleOrange }}>{`${sneaker.discountString}`}</p>
          </div>
          <p className='text-gray-400 line-through'>{`$${sneaker.cost}.00`}</p>
        </div>
        <div className='flex flex-col md:flex-row items-center gap-2'>
          <div id='quantity' className='bg-slate-100 w-full md:w-[150px] py-3 px-3 rounded-md flex items-center justify-between'>
            <button onClick={() => handleAddMinus("minus")} aria-label="Minus" className='text-[25px] p-2' style={{ color: orange }}><img src='/assets/images/icon-minus.png' className='w-[10px]' /></button>
            <p className=''>{quantity}</p>
            <button onClick={() => handleAddMinus("add")} aria-label="Plus" className='text-[25px] p-2' style={{ color: orange }}><img src='/assets/images/icon-plus.png' className='w-[10px]' /></button>
          </div>
          <button onClick={() => addCart('fall')} aria-label="Add to cart" disabled={quantity === 0} className={`${quantity === 0 ? "bg-orange-300" : "bg-orange-500"} w-full md:w-[240px] py-3 text-white rounded-lg font-medium text-sm flex items-center justify-center gap-3 shadow-xl transition duration-200 hover:bg-orange-300`}>
            <FontAwesomeIcon icon={faShoppingCart} className='text-md' />
            Add to cart
          </button>
        </div>
      </motion.div>
    </AnimatePresence>

  )
}

export default Description