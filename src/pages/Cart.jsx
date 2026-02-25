import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

function Cart() {
  const [cart, setCart] = useState([])
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    if (user?.cart) {
      setCart(user.cart)
    }
  }, [])

  // REMOVE ITEM
  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index)
    setCart(updatedCart)

    axios.patch(`http://localhost:5000/users/${user.id}`, {
      cart: updatedCart
      
    })
    toast.success("item removed")
    navigate('/cart')

    localStorage.setItem(
      "user",
      JSON.stringify({ ...user, cart: updatedCart })
    )
  }

  // TOTAL PRICE
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  // CHECKOUT
  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Cart is empty")
      return
    }
    navigate("/checkout")
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500 text-lg">
        Your cart is empty
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-8 tracking-tight">
        Shopping Cart
      </h1>

      {/* CART ITEMS */}
      <div className="space-y-6">
        {cart.map((item, index) => (
          <div
            key={index}
            className="flex gap-5 items-start border-b pb-6"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-28 object-cover rounded-md bg-gray-100"
            />

            <div className="flex-1 space-y-1">
              <h2 className="text-lg font-medium">{item.name}</h2>
              <p className="text-sm text-gray-500">
                Size: {item.size} · Qty: {item.quantity}
              </p>
              <p className="text-sm font-semibold">
                ₹{item.price * item.quantity}
              </p>
            </div>

            <button
              onClick={() => removeItem(index)}
              className="text-sm text-gray-400 hover:text-red-500 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* TOTAL + CHECKOUT */}
      <div className="flex items-center justify-between mt-10 border-t pt-6">
        <h2 className="text-xl font-semibold">
          Total ₹{totalAmount}
        </h2>

        <button
          onClick={handleCheckout}
          className="bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:opacity-90 transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart