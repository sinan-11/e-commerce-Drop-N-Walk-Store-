import axios from "axios"
import React, { useEffect, useState } from "react"

function Orders() {
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user.id || user.role === "admin") return

    axios
      .get(`http://localhost:5000/users/${user.id}`)
      .then(res => setOrders(res.data.orders || []))
      .finally(() => setLoading(false))
  }, [user.id])

  if (user.role === "admin") {
    return <p className="p-6">Admin has no personal orders</p>
  }

  if (loading) return <p className="p-6">Loading orders...</p>

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map(order => (
          <div
            key={order.orderId}
            className="border rounded-xl p-4 mb-6 bg-white shadow"
          >
            <div className="flex justify-between mb-3">
              <div>
                <p className="font-semibold">Order ID: {order.orderId}</p>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>
              <span className="font-semibold text-blue-600">
                {order.status}
              </span>
            </div>

            {/* ITEMS */}
            <div className="space-y-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Size: {item.size} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">₹ {item.price}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between font-semibold">
              <p>Total</p>
              <p>₹ {order.total}</p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Orders