import React from 'react'
import { addDoc, collection, doc, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
function AddCart() {
  // async function addNewUser() {
  //   await fetch('/api/createUser', {
  //     method: "POST",
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body:JSON.stringify({
  //       name:"Tan",
  //       age: 22,
  //       gender: "male",
  //       email: "jonathansoriano0521@gmail.com"
  //     })  
  //   })
  async function addNewUser() {
    await setDoc(doc(db, 'user', 'dummyUser'), {
      name: "John Doe"
    })
  }
  async function addToCart() {
    await addDoc(collection(db, 'user', 'dummyUser', 'cart'), {
      name: "Kyrie 4",
      product: "Shoes",
      brand: "Nike",
      timeAdded: serverTimestamp()
    })
  }
  const [userCart] = useCollection(query(
    collection(db, 'user', 'dummyUser', 'cart'),
    orderBy("timeAdded", "asc")
  ))

  // console.log(userCart?.docs[1].data())

  return (
    <div>
      <button onClick={addNewUser}>Add new user</button><br></br>
      <button onClick={addToCart}>Add to cart</button>
      <div>
        {
          userCart?.docs.map((data: any,index) => (
            <p key={index}>{data.data().name}</p>
          ))
        }
      </div>
    </div>

  )
}

export default AddCart