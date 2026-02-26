import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function Login() {
  const [currentState, setCurrentState] = useState("Login")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  async function onSubmitHandler(e) {
    e.preventDefault()

    /* ================= SIGN UP ================= */
    if (currentState === "Sign Up") {
      try {
        const res = await axios.get(
          `http://localhost:5000/users?email=${email}`
        )

        if (res.data.length > 0) {
          toast.error("Email already exists. Please login.")
          return
        }

        await axios.post("http://localhost:5000/users", {
          name,
          email,
          password,
          role: "user",
          blocked: false,
          cart: [],
          orders: []
        })

        toast.success("Account created successfully!")
        setCurrentState("Login")
        setName("")
        setEmail("")
        setPassword("")
      } catch (error) {
        console.log(error)
        toast.error("Something went wrong")
      }
    }

    /* ================= LOGIN ================= */
    if (currentState === "Login") {
      try {
        const res = await axios.get(
          `http://localhost:5000/users?email=${email}`
        )

        if (res.data.length === 0) {
          toast.error("User not found")
          return
        }

        const loggedUser = res.data[0]

        if (loggedUser.password !== password) {
          toast.error("Invalid email or password")
          return
        }

        /* 🚫 BLOCK CHECK */
        if (loggedUser.blocked) {
          toast.error("Your account has been blocked by admin")
          return
        }

        toast.success("Login successful")

        /* ADMIN LOGIN */
        if (loggedUser.role === "admin") {
          localStorage.setItem("admin", JSON.stringify(loggedUser))
          navigate("/admin/dashboard")
          return
        }

        /* USER LOGIN */
        localStorage.setItem("user", JSON.stringify(loggedUser))
        navigate("/collections")

        setEmail("")
        setPassword("")
      } catch (error) {
        console.log("ERROR:", error.message)
        toast.error("Login failed")
      }
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-10 mb-10 gap-4 text-gray-800"
    >
      <div className="flex flex-col items-center gap-4 mt-10 w-full">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />

        {currentState !== "Login" && (
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="w-full flex justify-between text-sm mt-1">
          {currentState === "Login" ? (
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="cursor-pointer hover:underline"
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("Login")}
              className="cursor-pointer hover:underline"
            >
              Login Here
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-black text-white font-light px-8 py-2 mt-4"
        >
          {currentState === "Login" ? "LOG IN" : "SIGN UP"}
        </button>
      </div>
    </form>
  )
}

export default Login