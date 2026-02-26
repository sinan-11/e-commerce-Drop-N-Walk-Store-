import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

function Cart() {
  const [cart, setCart] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const checkUser = async () => {
      const localUser = JSON.parse(localStorage.getItem("user"))
      if (!localUser) {
        navigate("/login")
        return
      }

      try {
        const res = await axios.get(
          `http://localhost:5000/users/${localUser.id}`
        )
        const user = res.data

        if (user.blocked) {
          toast.error("Your account has been blocked")
          localStorage.removeItem("user")
          navigate("/login")
          return
        }

        setCart(user.cart || [])
        localStorage.setItem("user", JSON.stringify(user))

      } catch {
        toast.error("Session expired")
        navigate("/login")
      }
    }

    checkUser()
  }, [])

  const removeItem = async (index) => {
    const localUser = JSON.parse(localStorage.getItem("user"))
    const updatedCart = cart.filter((_, i) => i !== index)

    await axios.patch(`http://localhost:5000/users/${localUser.id}`, {
      cart: updatedCart
    })

    setCart(updatedCart)
    localStorage.setItem(
      "user",
      JSON.stringify({ ...localUser, cart: updatedCart })
    )

    toast.success("Item removed")
  }

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Your cart is empty
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>

      {cart.map((item, index) => (
        <div key={index} className="flex gap-5 border-b pb-6">
          <img src={item.image} className="w-24 h-28 rounded" />
          <div className="flex-1">
            <h2 className="font-medium">{item.name}</h2>
            <p>Size {item.size} · Qty {item.quantity}</p>
            <p>₹{item.price * item.quantity}</p>
          </div>
          <button onClick={() => removeItem(index)}>Remove</button>
        </div>
      ))}

      <div className="flex justify-between mt-8">
        <h2>Total ₹{totalAmount}</h2>
        <button
          onClick={() => navigate("/checkout")}
          className="bg-black text-white px-6 py-2 rounded-full"
        >
          Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart