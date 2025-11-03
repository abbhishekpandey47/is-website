import React from "react";
import Comparison from "./components/page"


export const metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function InfrasityVsDevloper() {
  return (
   <Comparison/>
  )
}