'use client'

import axios from "axios";
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Link from "next/link";

const ProfilePage = ({ params }: any) => {

  const [userData, setUserData] = useState({
    _id: '', firstName: ''
  })
  const router = useRouter()
  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success('Logout successful')
      router.push('/login')
    } catch (error: any) {
      console.log(error.message)
      toast.error(error.message)
    }
  }


  const getUserDetails = async () => {
    const respond = await axios.get('/api/users/detail')
    // console.log(respond.data.data.firstName)
    setUserData(respond.data.data)
    // return respond.data
    // console.log(respond.data.data._id)
  }
  getUserDetails()



  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {userData.firstName === '' ? "loading" :
        <>
          <h2>
            {/* {userData._id === "" ? "nothing" : <Link href={`/profile/${userData._id}`}> Move</Link>} */}
          </h2 >
          <button className='bg-blue-500 text-white p-3 font-bold rounded hover:bg-blue-700'
            onClick={logout}
          >
            Logout
          </button>
          <h2 className="text-3xl"> Profile Page</h2>
          <p> Welcome, {userData.firstName} </p>
          <Link href={`/profile/${userData._id}`}> Visit your profile</Link>
        </>
      }
    </div>
  )
}

export default ProfilePage;