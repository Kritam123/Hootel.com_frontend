import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { useAppContext } from "@/context/AppContext"
import { useMutation, useQueryClient } from "react-query"
import * as apiClient from "../api_Client";
import { toast } from "sonner";
const Header = () => {
  const { isLoggedIn,user } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const { mutate, isLoading } = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      toast.success("Logged Out!");
      await queryClient.invalidateQueries("validateToken");
      navigate("/signin");
    },
    onError: (error: Error) => {
      toast.error(error.message)
    }
  })
  const handleLogOut = () => {
    mutate();
  }


  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">
            Hotel.com
          </Link>
        </span>
        {
          isLoggedIn ? 
          <div className="space-x-3">
            <Link to={"/my-bookings"}>
            <Button>My booking</Button>
            </Link>
            <Link to={"/my-hotels"}>
            <Button>My Hotels</Button>
            </Link>
            <span className="text-white">Hi, <span className="font-semibold">{user?.firstName}</span></span>
            <Button onClick={handleLogOut} variant={"secondary"}>
              {isLoading ? "Logging Out ...." : "SignOut"}
            </Button>
          </div> 
          :
            <Button variant={"outline"} className="text-blue-500 font-bold hover:text-blue-400" >
              <Link to="/signin">
                SignIn
              </Link>
            </Button>
        }

      </div>

    </div>
  )
}

export default Header
