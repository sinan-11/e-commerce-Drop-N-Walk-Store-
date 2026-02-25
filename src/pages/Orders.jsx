import React from "react"

function Orders() {
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const orders = Array.isArray(user.orders) ? [...user.orders].reverse() : []

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center gap-3">
        <svg className="w-10 h-10 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 1 0 2 0 1 1 0 0 0-2 0m7 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0" />
        </svg>
        <p className="text-sm text-stone-400 tracking-wide">No orders yet</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-2xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs tracking-widest uppercase text-stone-400 font-medium mb-2">
            Account
          </p>
          <h1 className="text-3xl font-semibold text-stone-800 tracking-tight">
            My Orders
          </h1>
          <div className="mt-4 w-8 h-px bg-amber-700 opacity-60" />
        </div>

        {/* Orders */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white border border-stone-200 rounded-md overflow-hidden"
            >
              {/* Order Header */}
              <div className="flex items-start justify-between px-5 py-4 border-b border-stone-100">
                <div>
                  <p className="text-xs text-stone-400 font-medium tracking-widest uppercase mb-1">
                    {order.orderId}
                  </p>
                  <p className="text-xs text-stone-400">
                    {order.date || "—"}
                  </p>
                </div>
                <span className="text-xs font-medium tracking-wide uppercase px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-100">
                  {order.status || "Placed"}
                </span>
              </div>

              {/* Items */}
              <div className="divide-y divide-stone-100 px-5">
                {(order.items || []).map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3.5">
                    <div>
                      <p className="text-sm font-medium text-stone-800">{item.name}</p>
                      <p className="text-xs text-stone-400 mt-0.5">
                        {item.size ? `Size: ${item.size} · ` : ""}Qty: {item.quantity || 1}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-stone-700">
                      ₹{(item.price || 0) * (item.quantity || 1)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Address + Payment */}
              <div className="bg-stone-50 border-t border-stone-100 px-5 py-4 space-y-3">
                {order.address && (
                  <div>
                    <p className="text-xs tracking-widest uppercase text-stone-400 font-medium mb-1">
                      Deliver to
                    </p>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {order.address.name}, {order.address.street},{" "}
                      {order.address.city}, {order.address.state} – {order.address.pincode}
                    </p>
                    <p className="text-xs text-stone-400 mt-0.5">
                      {order.address.phone}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                  <p className="text-xs text-stone-400">
                    Payment:{" "}
                    <span className="text-stone-600 font-medium">
                      {order.paymentMethod || "COD"}
                    </span>
                  </p>
                  <p className="text-sm font-semibold text-stone-800">
                    ₹{order.total || 0}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Orders
