import { Container } from 'react-bootstrap';
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Logout from './components/Logout';
import Home from './pages/Home';
import DrinkList from './pages/DrinkList';
import Admin from './pages/Admin';
import Service from './pages/Service';

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
          <Route path="/drinks" element={<DrinkList />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/service" element={<Service />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App
