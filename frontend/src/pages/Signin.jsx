import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userContext } from '../_context/userContext';


const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(null)
  const {update, setUpdate} = useContext(userContext)

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email: email,
        password: password,
      }
      // const response = await fetch('http://localhost:3000/api/signin', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      //   credentials: 'include'
      // })
      const response = await fetch('https://full-auth-system-mern-assignment-backend.onrender.com/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
      })

      const resData = await response.json()
      console.log(resData)


      if (response.ok && response.status == 200) {
        toast.success(resData.message || "Signin successful!");
        setUpdate(!update)
        navigate('/');
      }
      else if (response.status == 400){
        toast.error("either email or password is empty")
      }
      else if (response.status == 500){
        toast.error("either email or password or both are wrong")
      }
      else {
        toast.error(resData.error || "Signin failed!");
      }

    } catch (err) {
    console.log(err)
    toast.error("An error occurred during signup!");
  }

  };
  return (
    <div className="flex items-center justify-center h-[100vh] bg-slate-300">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login to Your Account</h2>
        
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
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
              className="w-full px-3 py-2 mt-1 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter Your Email"
            />
            <div className='text-gray-400 pl-3'>Use: test@mail.com</div>
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
              className="w-full px-3 py-2 mt-1 border rounded-md border-gray-300 outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter Your Password"
            />
            <div className='text-gray-400 pl-3'>Use: 1234@test</div>
          </div>


          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700 "
          >
            Sign In
          </button>

          <div className='text-center text-gray-500 font-semibold'>
            Don't have an account yet ? <a href="/signup" className='text-blue-700 font-bold'>Sign up</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signin
