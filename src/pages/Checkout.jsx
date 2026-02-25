import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

function Checkout() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))
  const cart = user?.cart || []

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: ""
  })

  const [paymentMethod, setPaymentMethod] = useState("COD")

  const totalAmount = cart.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const itemCount = cart.reduce((sum, i) => sum + i.quantity, 0)

  const placeOrder = async (e) => {
    e.preventDefault()

    if (!user) return alert("Login first")
    if (cart.length === 0) return toast.error("Cart is empty")

    for (let key in address) {
      if (!address[key]) return toast.error("Fill all address fields")
    }

    if (address.phone.length !== 10) {
      return toast.error("Enter valid 10-digit phone number")
    }

    if (address.pincode.length !== 6) {
      return toast.error("Enter valid 6-digit pincode")
    }

    if (paymentMethod === "UPI") {
      return toast.error("UPI is currently not available")
    }

    const newOrder = {
      orderId: "ORD-" + Date.now(),
      items: cart,
      total: totalAmount,
      address,
      paymentMethod,
      status: "Placed",
      date: new Date().toLocaleString()
    }

    const updatedUser = {
      ...user,
      orders: [...(user.orders || []), newOrder],
      cart: []
    }

    try {
      await axios.patch(
        `http://localhost:5000/users/${user.id}`,
        updatedUser
      )
      localStorage.setItem("user", JSON.stringify(updatedUser))
      navigate("/orders")
    } catch (err) {
      console.error(err)
     toast.error("Order failed")
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-lg mx-auto px-6 py-16">

        <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

        <form onSubmit={placeOrder}>

          {/* Address */}
          <h2 className="text-sm font-medium mb-2">Delivery Address</h2>

          <input
            placeholder="Full Name"
            value={address.name}
            onChange={(e) =>
              setAddress({ ...address, name: e.target.value })
            }
            className="w-full mb-3 p-3 border rounded"
          />

          <input
            placeholder="Phone Number"
            value={address.phone}
            maxLength={10}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "")
              setAddress({ ...address, phone: value })
            }}
            className="w-full mb-3 p-3 border rounded"
          />

          <input
            placeholder="Street Address"
            value={address.street}
            onChange={(e) =>
              setAddress({ ...address, street: e.target.value })
            }
            className="w-full mb-3 p-3 border rounded"
          />

          <div className="grid grid-cols-2 gap-3 mb-6">
            <input
              placeholder="City"
              value={address.city}
              onChange={(e) =>
                setAddress({ ...address, city: e.target.value })
              }
              className="p-3 border rounded"
            />
            <input
              placeholder="State"
              value={address.state}
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value })
              }
              className="p-3 border rounded"
            />
          </div>

          <input
            placeholder="Pincode"
            value={address.pincode}
            maxLength={6}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "")
              setAddress({ ...address, pincode: value })
            }}
            className="w-full mb-6 p-3 border rounded"
          />

          {/* Payment */}
          <h2 className="text-sm font-medium mb-2">Payment Method</h2>

          <div className="mb-6 space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />
              Cash on Delivery
            </label>

            <label className="flex items-center gap-2 text-gray-400">
              <input type="radio" disabled />
              UPI (Currently not available)
            </label>
          </div>

          {/* Summary */}
          <div className="mb-6 text-sm">
            <p>Items: {itemCount}</p>
            <p>Total: ₹{totalAmount}</p>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded"
          >
            Place Order
          </button>

        </form>
      </div>
    </div>
  )
}

export default Checkout