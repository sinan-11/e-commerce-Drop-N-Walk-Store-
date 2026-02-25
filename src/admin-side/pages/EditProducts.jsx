import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

function EditProducts() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    gender: "",
    price: "",
    description: "",
    images: [],
    sizes: []
  })

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then(res => {
        const product = res.data.find(p => String(p.id) === String(id))

        if (!product) {
          toast.error("Product not found")
          navigate("/admin/products")
          return
        }

        setForm({
          name: product.name || "",
          brand: product.brand || "",
          category: product.category || "",
          gender: product.gender || "",
          price: product.price || "",
          description: product.description || "",
          images: product.images || [],
          sizes: product.sizes || []
        })
      })
      .catch(() => toast.error("Failed to load product"))
      .finally(() => setLoading(false))
  }, [id, navigate])

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImageChange = (index, value) => {
    const updated = [...form.images]
    updated[index] = value
    setForm({ ...form, images: updated })
  }

  const addImage = () => {
    setForm({ ...form, images: [...form.images, ""] })
  }

  const removeImage = (index) => {
    setForm({
      ...form,
      images: form.images.filter((_, i) => i !== index)
    })
  }

  const toggleSize = (size) => {
    setForm(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }))
  }

 
  const handleSubmit = (e) => {
    e.preventDefault()
    setSaving(true)

    axios
      .put(`http://localhost:5000/products/${id}`, {
        ...form,
        price: Number(form.price)
      })
      .then(() => {
        toast.success("Product updated successfully")
        navigate("/admin/products")
      })
      .catch(() => toast.error("Update failed"))
      .finally(() => setSaving(false))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading product...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">

        <h2 className="text-2xl font-semibold mb-6">Edit Product</h2>

        <form onSubmit={handleSubmit} className="space-y-6">

         
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full p-3 border rounded-lg"
            required
          />

          
          <div className="grid grid-cols-3 gap-4">
            <input
              name="brand"
              value={form.brand}
              onChange={handleChange}
              placeholder="Brand"
              className="p-3 border rounded-lg"
            />

            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Category"
              className="p-3 border rounded-lg"
            />

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="p-3 border rounded-lg"
            >
              <option value="">Gender</option>
              <option>Men</option>
              <option>Women</option>
              <option>Unisex</option>
            </select>
          </div>

         
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-3 border rounded-lg"
          />

         
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            placeholder="Description"
            className="w-full p-3 border rounded-lg"
          />

          
          <div>
            <p className="font-medium mb-2">Images</p>

            {form.images.map((img, index) => (
              <div key={index} className="flex gap-3 mb-2">
                <input
                  value={img}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder={`Image URL ${index + 1}`}
                  className="flex-1 p-2 border rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="px-3 bg-red-600 text-white rounded"
                >
                  ✕
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addImage}
              className="mt-2 px-4 py-2 bg-slate-800 text-white rounded"
            >
              + Add Picture
            </button>
          </div>

         
          <div className="flex gap-3 flex-wrap">
            {form.images.map((img, i) => (
              img && (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className="w-24 h-24 object-cover rounded border"
                />
              )
            ))}
          </div>

         
          <div>
            <p className="font-medium mb-2">Sizes</p>
            <div className="flex gap-2 flex-wrap">
              {[6,7,8,9,10,11].map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`px-4 py-2 rounded border ${
                    form.sizes.includes(size)
                      ? "bg-slate-800 text-white"
                      : "bg-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-slate-800 text-white rounded"
            >
              {saving ? "Saving..." : "Update Product"}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default EditProducts