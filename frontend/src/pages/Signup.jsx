import React, { useState } from "react"
import { useAuth } from "../components/AuthProvider"
import axiosInstance from "../api/axiosInstance"
import { useNavigate } from "react-router-dom"

export default function SignupPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [usn, setUSN] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      const response = await axiosInstance.post("/auth/signup", {
        email,
        usn,
        password,
      })

      login(response.data.data.accessToken)

      if (response.status === 201) {
        navigate("/register")
      } else {
        setError("Signup failed")
      }
    } catch (error) {
      let errorMessage = "An unknown error occurred. Please try again."
      if (error.response?.data) {
        const matchedMessage = error.response.data.match(/Error:\s(.*?)<br>/)?.[1]
        errorMessage = matchedMessage || errorMessage
      }

      console.error("Signup failed:", errorMessage)
      setError(errorMessage)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Sign Up</h2>
          <p className="mt-2 text-sm text-gray-600">Enter your details below to create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400
                       focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="usn" className="block text-sm font-medium text-gray-900">
              USN
            </label>
            <input
              id="usn"
              type="text"
              required
              placeholder="Enter your USN"
              className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400
                       focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              value={usn}
              onChange={(e) => setUSN(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your password"
                className="block w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400
                         focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">
              Confirm Password
            </label>
            <div className="relative mt-1">
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Confirm your password"
                className="block w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400
                         focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-md bg-black px-3 py-2 text-sm font-medium text-white 
                     hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                     transition-colors"
          >
            Sign Up
          </button>
        </form>
        <div className="space-y-2 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} className="font-medium text-black hover:underline cursor-pointer">
              Log In
            </span>
          </p>
          <p className="text-sm text-gray-500">
            Are you a counsellor?{" "}
            <span className="font-medium text-black hover:underline cursor-pointer">Contact Admin</span>
          </p>
        </div>
      </div>
    </div>
  )
}

