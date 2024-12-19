'use client'

import React from 'react'
import  Slider  from './slider'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Demo() {
  const handleAccept = () => {
    toast.success('Accepted!', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  const handleDecline = () => {
    toast.error('Declined!', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 w-[1000px]">
      <h1 className="text-3xl font-bold mb-8 text-white">Slider Demo</h1>
      <Slider onAccept={handleAccept} onDecline={handleDecline} />
      <ToastContainer />
    </div>
  )
}

