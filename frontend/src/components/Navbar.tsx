import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Bike, LogOut, LayoutDashboard } from 'lucide-react';

const AppNavbar: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Navbar expand="lg" variant="dark" className="premium-navbar sticky-top py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 fw-bold fs-3 text-warning">
          <Bike size={32} />
          <span>BikeRent<span className="text-white">IN</span></span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-3">
            <Nav.Link as={Link} to="/" className="text-white opacity-75 hover-opacity-100">Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className="text-white opacity-75 hover-opacity-100">About</Nav.Link>
            
            {token ? (
              <>
                <Nav.Link as={Link} to={user.role === 'ADMIN' ? '/admin' : '/dashboard'} className="text-white opacity-75 d-flex align-items-center gap-2">
                  <LayoutDashboard size={20} />
                  {user.role === 'ADMIN' ? 'Admin' : 'Dashboard'}
                </Nav.Link>
                <Button variant="link" onClick={handleLogout} className="text-danger p-0 d-flex align-items-center gap-2 text-decoration-none">
                  <LogOut size={20} />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="text-white opacity-75">Login</Nav.Link>
                <Link to="/signup">
                  <Button className="btn-premium">Sign Up</Button>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
