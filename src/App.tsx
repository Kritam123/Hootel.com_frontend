import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layout/layout"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { useAppContext } from "./context/AppContext"

function App() {
 const {isLoggedIn} =  useAppContext()
  return (
    
    <Routes>
     {!isLoggedIn &&
     <>
     <Route path="/signup" element={
       <Layout>
          <Register/>        
        </Layout>
      }/>
      <Route path="/signin" element={
        <Layout>
          <Login/>        
        </Layout>
      }/>
      </>
      }
      <Route path="/" element={
        <Layout>
           <span>Home Page</span>
      </Layout>
      }/>
      <Route path="/search" element={
        <Layout>
         <span>Search Page</span>
      </Layout>
      }/>
   <Route path="*" element={<Navigate to="/"/>}/>
    </Routes>
  )
}

export default App
