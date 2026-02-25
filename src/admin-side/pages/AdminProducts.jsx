import axios from "axios"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then(res => setProducts(res.data))
      .catch(() => toast.error("Failed to load products"))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return

    axios
      .delete(`http://localhost:5000/products/${id}`)
      .then(() => {
        setProducts(prev => prev.filter(p => p.id !== id))
        toast.success("Product deleted")
      })
      .catch(() => toast.error("Delete failed"))
  }

  return (
    
    <div className="p-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-8">
<div className="grid grid-cols-3 items-center mb-8 pb-4 border-b border-gray-200">
 
  <h2 className="col-span-2 text-3xl font-semibold text-gray-900 tracking-tight">
    Products
  </h2>

  
  <div className="flex justify-center">
    <button
      onClick={() => navigate("/admin/products/add")}
      className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium
                 bg-slate-800 text-white rounded-lg
                 hover:bg-slate-900 transition-all
                 shadow-sm hover:shadow-md"
    >
      + Add Product
    </button>
  </div>
</div>
  <div className="overflow-x-auto rounded-xl border border-gray-200">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100 text-left text-xs uppercase tracking-wider text-gray-600">
          <th className="p-4">Image</th>
          <th className="p-4">Name</th>
          <th className="p-4 text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
        {loading && (
          <tr>
            <td colSpan="3" className="p-10 text-center text-gray-500">
              Loading products...
            </td>
          </tr>
        )}

        {!loading && products.map(item => (
         <tr
          key={item.id}
    className="border-b last:border-none hover:bg-gray-50 transition-colors"
           >
    <td className="p-4">
      <img
        src={item.images?.[0]}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg border shadow-sm"
      />
    </td>

    <td className="p-4 text-base font-medium text-gray-900">
      {item.name}
    </td>

    <td className="p-4 text-center space-x-3">
     <button
  className="px-4 py-1.5 text-sm font-medium bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
  onClick={() => navigate(`/admin/products/edit/${item.id}`)}
      >
             Edit
              </button>

      <button
        onClick={() => handleDelete(item.id)}
        className="px-4 py-1.5 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-sm"
      >
        Delete
      </button>
    </td>
  </tr>
              ))}

  {!loading && products.length === 0 && (
    <tr>
      <td colSpan="3" className="p-10 text-center text-gray-500">
        No products found
      </td>
    </tr>
  )}
</tbody>
</table>
</div>

</div>

</div>
)
}

export default AdminProducts