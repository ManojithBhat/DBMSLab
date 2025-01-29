import React, { useState, useEffect } from "react"
import { useAuth } from "../components/AuthProvider"
import axiosInstance from "../api/axiosInstance"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const { user, login } = useAuth()
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/dashboard")
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axiosInstance.post("/auth/counsellor/login", credentials)
      login(data.data.accessToken)
      window.location.href = "/profile/counsellor"
    } catch (error) {
      let errorMessage = "An unknown error occurred. Please try again."
      if (error.response?.data) {
        const matchedMessage = error.response.data.match(/Error:\s(.*?)<br>/)?.[1]
        errorMessage = matchedMessage || errorMessage
      }
      console.error("Login failed:", errorMessage)
      setError(errorMessage)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-semibold text-black mb-2">Login</h1>
        <p className="text-gray-600 mb-6">Enter your email below to login to your account</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="m@example.com"
              className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400
                       focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <a href="/forgot-password" className="text-sm text-gray-600 hover:text-gray-900">
                Forgot your password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              required
              placeholder="Enter your password"
              className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400
                       focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-black px-3 py-2 text-sm font-medium text-white 
                     hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                     transition-colors"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
        <p className="text-center mt-6 text-gray-600">
          Don't have an account? Contact Admin{" "}
        </p>
      </div>
    </div>
  )
}

export default Login

