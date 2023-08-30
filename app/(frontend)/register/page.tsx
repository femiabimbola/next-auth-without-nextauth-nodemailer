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
    <div>
      <p> Register </p>
      <label htmlFor="username"> username</label>
    </div>
  )
}

export default Register;