import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Collections() {
  const [prod, setProd] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search,setSearch]=useState("")
  const[category,setCategory]=useState("All")
  const[gender,setGender]=useState("All")


  const filterProducts=prod.filter((item)=>{
    const matchSearch=
    item.name.toLowerCase().includes(search.toLowerCase()) ||
item.brand.toLowerCase().includes(search.toLowerCase()) 


const matchCategory=
category === "All" || item.category === category

const matchGender=
gender === "All" || item.gender === gender

return matchSearch && matchCategory && matchGender

})

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => { setProd(res.data); setLoading(false) })
      .catch((err) => { console.error(err); setError("Failed to load products"); setLoading(false) })
  }, [])

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>
  if (error) return <p className="text-center mt-10 text-red-400">{error}</p>

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">Products</h1>
   {/* Search  */}
      <input type="text"  placeholder="Search Products" className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
      value={search} onChange={(e)=>setSearch(e.target.value)}/>

     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 mb-6">

  {/* CATEGORY FILTER */}
  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="px-4 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black"
  >
    <option value="All">All Categories</option>
    <option value="Sneakers">Sneakers</option>
    <option value="Running Shoes">Running Shoes</option>
  </select>

  {/* GENDER FILTER */}
  <select
    value={gender}
    onChange={(e) => setGender(e.target.value)}
    className="px-4 py-2 border rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black"
  >
    <option value="All">All</option>
    <option value="Men">Men</option>
    <option value="Women">Women</option>
    <option value="Unisex">Unisex</option>
  </select>

</div>

     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filterProducts.length > 0?
        (filterProducts.map((item) => (
           <Link to={`${item.id}`}>
          <div key={item.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <img
              src={item.images?.[0]}
              alt={item.name}
              className="w-full h-52 object-cover"
            />
            <div className="p-4">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{item.category}</p>
              <h2 className="text-base font-medium text-gray-800">{item.name}</h2>
              <p className="text-sm text-gray-500 mb-4">{item.brand}</p>
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-gray-900">₹{Number(item.price).toLocaleString("en-IN")}</span>
                
              </div>
            </div>
          </div></Link>
        ))) : (
          <p className="text-gray-500 col-span-full text-center">
            No products found
          </p>
        )}
      </div>
    </div>
  )
}

export default Collections
