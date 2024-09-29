import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate(null)

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const data = {
        user_name: userName,
        email: email,
        password: password,
      }
      // const response = await fetch('http://localhost:3000/api/signup', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data)
      // })
      const response = await fetch('https://full-auth-system-mern-assignment-backend.onrender.com/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      const resData = await response.json()
      console.log(resData)


      if (response.ok) {
        toast.success(resData.message || "Signup successful!");
        navigate('/signin');
      } else {
        toast.error(resData.error || "Signup failed!");
      }

    } catch (err) {
    console.log(err)
    toast.error("An error occurred during signup!");
  }

};
return (
  <div>
    <div className="flex items-center justify-center h-[100vh] bg-slate-300">
      <div className="w-[96%] max-w-md p-8 space-y-8 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create New Account</h2>

        <form onSubmit={handleSignup} className="mt-8 space-y-6">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter a username"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter Your Email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1  rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter a Password"
            />
          </div>


          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            Sign In
          </button>

          <div className='text-center text-gray-500 font-semibold'>
            Already have an account ? <a href="/signin" className='text-blue-700 font-bold'>Log in</a>
          </div>
        </form>
      </div>
    </div>
  </div>
)
}

export default Signup



