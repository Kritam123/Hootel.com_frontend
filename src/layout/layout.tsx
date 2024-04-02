import React from "react"
import Header from "../components/Header"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="flex flex-col min-h-screen">
        <Header/>
        <Hero/>
        <div className="container mx-auto py-5 flex-1">
        {children}
        </div>
        <Footer/>
    </div>
  )
}

export default Layout