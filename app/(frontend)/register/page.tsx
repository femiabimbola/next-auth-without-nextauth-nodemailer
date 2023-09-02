"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"

const Register = () => {
  const [user, setUser] = useState({
    email: '', password: '', username: ''
  })

  const onSignup = async () => {

  }

  return (
    <div className="flex justify-center items-center h-screen">
      <p> Register </p>
      <input
        id="username" type="text" value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
      />
      <input
        id="email" type="email" value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <input
        id="password" type="text" value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button onClick={onSignup}> Register</button>
      <Link href={"/login"}>Visit Login Page</Link>
    </div>
  )
}

export default Register;

