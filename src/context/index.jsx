'use client'
import React from 'react'

import { useState } from 'react'

import AppContext from './Infracontext'

export const Appwrap = ({children}) => {
  const [progress, setProgress] = useState(0)
  return (
    <AppContext.Provider value={{ progress, setProgress}}>{children}</AppContext.Provider>
  )
}
