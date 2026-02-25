import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

function ProductDetails() {
  const { id } = useParams()
  const navigate=useNavigate()

  const [prod, setProd] = useState(null)
  const [mainImg, setMainImg] = useState("")
  const [selectedSize, setSelectedSize] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((res) => {
        setProd(res.data)
        setMainImg(res.data.images?.[0])
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p className="text-center mt-10">Loading...</p>
  if (!prod) return <p className="text-center mt-10">Product not found</p>

  function cartHandler(){


    const user=JSON.parse(localStorage.getItem('user'))


    if(!user){
      toast.error("Login First")
      navigate("/login")
      return 
    }
    const updatedCart = user.cart || []
    const existingItem=user.cart.find((v)=>{
  return v.id==prod.id && v.size===selectedSize
    })
    if (existingItem) {
    existingItem.quantity += 1 
    toast.success("item added")
  } else {
    updatedCart.push({
       id: prod.id,
      name: prod.name,
      price: prod.price,
      image: prod.images?.[0],
      size: selectedSize, 
      quantity: 1
    })
  }

    axios.patch(`http://localhost:5000/users/${user.id}`,{
      cart:updatedCart
    
  }  )
  .then(() => {
      // Update localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, cart: updatedCart })
      )

      toast.success("Added to cart ✅")
      navigate(`/collections`)
    })
    .catch((err) => console.error(err))

  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">

      {/* LEFT: IMAGES */}
      <div>
        <div className="bg-gray-100 rounded-xl overflow-hidden mb-4">
          <img
            src={mainImg}
            alt={prod.name}
            className="w-full h-[420px] object-cover"
          />
        </div>

        {/* THUMBNAILS */}
        <div className="flex gap-3">
          {prod.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="thumbnail"
              onClick={() => setMainImg(img)}
              className={`w-20 h-20 object-cover rounded cursor-pointer border
                ${mainImg === img ? "border-black" : "border-gray-200"}`}
            />
          ))}
        </div>
      </div>

      {/* RIGHT: DETAILS */}
      <div>
        <p className="text-sm uppercase text-gray-400">{prod.category}</p>

        <h1 className="text-3xl font-bold mt-2">{prod.name}</h1>
        <p className="text-gray-600 mt-1">{prod.brand}</p>

        <p className="text-2xl font-semibold mt-4">
          ₹{Number(prod.price).toLocaleString("en-IN")}
        </p>

        <p className="text-gray-700 mt-6 leading-relaxed">
          {prod.description}
        </p>

        {/* SIZE SELECTION */}
        <div className="mt-8">
          <p className="font-semibold mb-3">Select Size</p>
          <div className="flex gap-3 flex-wrap">
            {prod.sizes?.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded
                  ${selectedSize === size
                    ? "bg-black text-white"
                    : "hover:border-black"}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* ADD TO CART */}
        <button
          disabled={!selectedSize}
          className={`mt-8 w-full py-3 rounded-full font-semibold transition
            ${selectedSize
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-300 cursor-not-allowed"}` }onClick={()=>cartHandler()}
        >
          Add to Cart
        </button>

        {!selectedSize && (
          <p className="text-sm text-red-500 mt-2">
            Please select a size
          </p>
        )}
      </div>
    </div>
  )
}

export default ProductDetails
