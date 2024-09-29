import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
// import Cookies from 'js-cookie';
// import { jwtDecode } from "jwt-decode";
import { userContext } from './_context/userContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [user, setUser] = useState('')
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    // const token = Cookies.get('jwt_token')
    // if (token) {
    //   const decoded_user = jwtDecode(token)
    //   setUser(decoded_user)
    // }

    const CheckUser = async () => {
      const response = await fetch('http://localhost:3000/api/auth', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data)

      if (response.ok && data.user) {
        setUser(data.user);
        console.log("User is already logged in", data.user);
      } 
      else if (response.status === 400 && data.error) {
        console.log("Token issue:", data.error);
        setUser(null);
      } 
      else if (data.message === "no token present. Log in first") {
        console.log("No token detected. User not logged in.");
        setUser(null);
      };
    }
      CheckUser();
    }, [update])

    const handelLogout = async () => {
      try {
        const response = await fetch('http://localhost:3000/logout', {
          method: 'POST',
          credentials: 'include'
        });
  
        if (response.ok) {
          // Cookies.remove('jwt_Token');
          setUser(null);
          setUpdate(!update)
          window.location.reload()
        } else {
          alert('Logout failed!');
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }

  return (
    <userContext.Provider value={{ user, setUser ,update, setUpdate , handelLogout}}>
      <Routes>
        <Route path='/' element={
          <div>
            <Navbar />
            <div className='w-full h-[300px] flex justify-center items-center font-semibold text-xl'>{
              !user ?
                `Please, log in first`
                :
                `Welcome ${user.user_name}`
            }</div>
          </div>
        } />
        <Route path='/signup' element={
          <div>
            {
              !user ? <Signup />
                :
                <div className='flex flex-col justify-center items-center'>
                  <div className='w-full h-[300px] flex justify-center items-center font-semibold text-xl'>
                    Already Loggged In
                  </div>
                  <button className='px-4 py-1  bg-green-600 rounded-md text-white text-lg font-bold box-border' onClick={handelLogout}>Logout</button>
                </div>
            }
          </div>
        } />
        <Route path='/signin' element={
          <div>
            {
              !user ? <Signin />
                :
                <div className='flex flex-col justify-center items-center'>
                  <div className='w-full h-[300px] flex justify-center items-center font-semibold text-xl'>
                    Already Loggged In
                  </div>
                  <button className='px-4 py-1  bg-green-600 rounded-md text-white text-lg font-bold box-border' onClick={handelLogout}>Logout</button>
                </div>
            }
          </div>

        } />
      </Routes>
      <ToastContainer />
    </userContext.Provider>
  )
}

export default App
