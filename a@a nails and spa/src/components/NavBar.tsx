


import { useContext, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/UserProvider';

export default function Sidebar() {

  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedName = localStorage.getItem('name');
    const storedIsAdmin = localStorage.getItem('isAdmin');
    const storedLoggedIn = localStorage.getItem('loggedIn');
    if (storedToken && !user.token && storedLoggedIn ==='true' && storedIsAdmin === 'true') {
        setUser({
            name: storedName || '',
            token: storedToken,
            isAdmin: true,
            loggedIn: true,
        });
    } else if (storedToken && !user.token && storedLoggedIn ==='true' && storedIsAdmin === 'false') {
        setUser({
            name: storedName || '',
            token: storedToken,
            isAdmin: false,
            loggedIn: true,
        });
    }
    });

  return (
    <Navbar sticky="top" className="flex-column Sidebar">
      <Nav.Item>
        <Nav.Link as={NavLink} to="/">
          Home
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link as={NavLink} to="/services">
          services
        </Nav.Link>
      </Nav.Item>
      {user.isAdmin ? (
        <>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/admin">
              admin
            </Nav.Link>
          </Nav.Item>
        </>
      ) : (
        <></>
      )}
      
      {user.token || localStorage.getItem('token') ? (
        <>         
          <Nav.Item>
            <Nav.Link as={NavLink} to={`/drinks`}>
              drinks
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/logout">
              Logout
            </Nav.Link>
          </Nav.Item>
        </>
      ) : (
        <>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/register">
              Register
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/login">
              Login
            </Nav.Link>
          </Nav.Item>
        </>
      )}     
    </Navbar>
  );
}