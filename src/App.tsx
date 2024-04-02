import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useAppContext } from "./context/AppContext";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";
import AddHotel from "./pages/AddHotel";
import EditHotel from "./pages/EditHotel";
import MyHotels from "./pages/MyHotels";
import MyBookings from "./pages/MyBookings";

function App() {
  const { isLoggedIn } = useAppContext();
  return (
    <Routes>
      {!isLoggedIn && (
        <>
          <Route
            path="/signup"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />
          <Route
            path="/signin"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
        </>
      )}
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/search"
        element={
          <Layout>
            <Search />
          </Layout>
        }
      />
      <Route
        path="/detail/:hotelId"
        element={
          <Layout>
            <Detail />
          </Layout>
        }
      />
      {isLoggedIn && (
        <>
          <Route
            path="/hotel/:hotelId/booking"
            element={
              <Layout>
                <Booking />
              </Layout>
            }
          />

          <Route
            path="/add-hotel"
            element={
              <Layout>
                <AddHotel />
              </Layout>
            }
          />
          <Route
            path="/edit-hotel/:hotelId"
            element={
              <Layout>
                <EditHotel />
              </Layout>
            }
          />
          <Route
            path="/my-hotels"
            element={
              <Layout>
                <MyHotels />
              </Layout>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <Layout>
                <MyBookings />
              </Layout>
            }
          />
        </>
      )}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
