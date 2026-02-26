import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, InputGroup, Alert, Spinner } from 'react-bootstrap';
import { User, Mail, Lock, MapPin, UserPlus, AlertCircle } from 'lucide-react';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero-gradient min-vh-100 d-flex align-items-center py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="premium-glass p-4 p-md-5 shadow-2xl position-relative overflow-hidden border-0">
              {/* Decorative elements */}
              <div className="position-absolute rounded-circle bg-warning opacity-10 blur-3xl" style={{ top: '-100px', right: '-100px', width: '250px', height: '250px', filter: 'blur(80px)' }}></div>
              <div className="position-absolute rounded-circle bg-primary opacity-5 blur-3xl" style={{ bottom: '-100px', left: '-100px', width: '200px', height: '200px', filter: 'blur(60px)' }}></div>

              <div className="text-center mb-5 position-relative z-index-1">
                <h2 className="display-6 fw-bold mb-2 text-white">Create <span className="text-warning">Account</span></h2>
                <p className="text-white-50">Join the ride across India</p>
              </div>

              {error && (
                <Alert variant="danger" className="bg-danger bg-opacity-10 border-danger border-opacity-25 text-danger d-flex align-items-center gap-3 rounded-4 mb-4">
                  <AlertCircle size={20} />
                  <span className="small">{error}</span>
                </Alert>
              )}

              <Form onSubmit={handleSubmit} className="position-relative z-index-1">
                <Form.Group className="mb-4">
                  <Form.Label className="text-uppercase small fw-bold tracking-wider text-white-50 ms-1 mb-2">Full Name</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-dark-accent border-end-0 border-white-10 text-warning px-3 rounded-start-4">
                      <User size={18} />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      required
                      placeholder="John Doe"
                      className="form-control-premium border-start-0 rounded-end-4"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="text-uppercase small fw-bold tracking-wider text-white-50 ms-1 mb-2">Email Address</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-dark-accent border-end-0 border-white-10 text-warning px-3 rounded-start-4">
                      <Mail size={18} />
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      required
                      placeholder="john@example.com"
                      className="form-control-premium border-start-0 rounded-end-4"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="text-uppercase small fw-bold tracking-wider text-white-50 ms-1 mb-2">Location (Region/City)</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-dark-accent border-end-0 border-white-10 text-warning px-3 rounded-start-4">
                      <MapPin size={18} />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Mumbai, India"
                      className="form-control-premium border-start-0 rounded-end-4"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-5">
                  <Form.Label className="text-uppercase small fw-bold tracking-wider text-white-50 ms-1 mb-2">Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-dark-accent border-end-0 border-white-10 text-warning px-3 rounded-start-4">
                      <Lock size={18} />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      required
                      placeholder="••••••••"
                      className="form-control-premium border-start-0 rounded-end-4"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                  </InputGroup>
                </Form.Group>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="btn-premium w-100 py-3 d-flex align-items-center justify-content-center gap-2 mb-4"
                >
                  {loading ? (
                    <Spinner animation="border" size="sm" variant="dark" />
                  ) : (
                    <>
                      <UserPlus size={20} />
                      <span>Create Account</span>
                    </>
                  )}
                </Button>
              </Form>

              <div className="text-center position-relative z-index-1 mt-2">
                <p className="text-white-50 small mb-0">
                  Already have an account? <Link to="/login" className="text-warning fw-bold text-decoration-none ms-1">Login here</Link>
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;
