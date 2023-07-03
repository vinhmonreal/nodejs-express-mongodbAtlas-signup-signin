import { Container } from 'react-bootstrap';
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Logout from './components/Logout';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Service from './pages/Service';
import RemoveService from './pages/RemoveService';
import UpdateService from './pages/UpdateService';
import AddDrink from './pages/AddDrink';
import AddService from './pages/AddService';
import Services from './pages/GetServices';
import GetServices from './pages/GetServices';
import GetDrinks from './pages/GetDrinks';
import UpdateDrink from './pages/UpdateDrink';
import Drink from './pages/Drink';
import DeliveryText from './pages/DeliveryText';

function App() {
  return (   
    <Container className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/UserPage/:username" element={<UserPage />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />   
          <Route path="/services" element={<Service />} />
          <Route path="/drinks" element={<Drink />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/services" element={<GetServices />} />
          <Route path="/admin/updateservice" element={<UpdateService />} />
          <Route path="/admin/addservice" element={<AddService />} /> 

          <Route path="/admin/drinks" element={<GetDrinks/>} />
          <Route path="/admin/updatedrink" element={<UpdateDrink />} />
          <Route path="/admin/adddrink" element={<AddDrink />} /> 
          <Route path="/admin/deliverytext" element={<DeliveryText />} /> 

          

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App
