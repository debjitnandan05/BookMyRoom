import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import HotelList from "./pages/list/HotelList";
import SingleHotel from "./pages/hotel/SingleHotel";
import AgraHotels from "./components/featured/listCity/AgraHotels";
import DelhiHotels from "./components/featured/listCity/DelhiHotels";
import KolkataHotels from "./components/featured/listCity/KolkataHotels";
import MumbaiHotels from "./components/featured/listCity/MumbaiHotels";
import JaipurHotels from "./components/featured/listCity/JaipurHotels";
import ChennaiHotels from "./components/featured/listCity/ChennaiHotels";



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/hotels" element={<HotelList/>}/>
      <Route path="/hotels/:id" element={<SingleHotel/>}/>

      <Route path="/hotels/Agra" element={<AgraHotels/>}/>
      <Route path="/hotels/Delhi" element={<DelhiHotels/>}/>
      <Route path="/hotels/Kolkata" element={<KolkataHotels/>}/>
      <Route path="/hotels/Mumbai" element={<MumbaiHotels/>}/>
      <Route path="/hotels/Jaipur" element={<JaipurHotels/>}/>
      <Route path="/hotels/Chennai" element={<ChennaiHotels/>}/>
      
    </Routes>
  </BrowserRouter>
  )
}

export default App;