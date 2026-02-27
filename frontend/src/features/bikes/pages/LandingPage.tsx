import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Badge } from 'react-bootstrap';
import { Search, MapPin, Calendar } from 'lucide-react';
import BikeCard from '../components/BikeCard';
import TestimonialsSection from '../components/TestimonialsSection';
import { bikeApi } from '../api/bike.api';
import type { Bike } from '../bike.types';

const LandingPage: React.FC = () => {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [search, setSearch] = useState({
    location: '',
    date: '',
    type: ''
  });

  const fetchBikes = async () => {
    try {
      const response = await bikeApi.getBikes({
        location: search.location || undefined,
        type: search.type || undefined
      });
      setBikes(response.data);
    } catch (error) {
      console.error('Error fetching bikes:', error);
    }
  };

  useEffect(() => {
    fetchBikes();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBikes();
  };

  const handleRent = (id: number) => {
    console.log('Rent bike:', id);
    // TODO: Implement booking flow
  };

  return (
    <div className="landing-page hero-gradient">
      {/* Hero Section */}
      <section className="py-5 py-md-5 min-vh-75 d-flex align-items-center position-relative overflow-hidden">
        <Container className="position-relative z-2 py-5">
          <Row className="justify-content-center text-center">
            <Col lg={10} xl={8}>
              <Badge bg="warning" text="dark" className="px-3 py-2 rounded-pill mb-4 fw-bold text-uppercase letter-spacing-1">
                Premium Bike Rentals
              </Badge>
              <h1 className="display-2 fw-black mb-4 animate-fade-in text-white">
                Experience the Ultimate <span className="text-warning">Indian Road Trip</span>
              </h1>
              <p className="lead text-white-50 mb-5 fs-4">
                Unlimited freedom, zero compromises. Rent premium bikes and cruisers at India's most transparent subscription rates.
              </p>

              <Form onSubmit={handleSearch} className="premium-glass p-3 shadow-2xl mx-auto max-width-xl">
                <Row className="g-2">
                  <Col md={5}>
                    <InputGroup>
                      <InputGroup.Text className="bg-transparent border-0 text-warning">
                        <MapPin size={20} />
                      </InputGroup.Text>
                      <Form.Control
                        className="form-control-premium border-0"
                        placeholder="Where to?"
                        value={search.location}
                        onChange={(e) => setSearch({...search, location: e.target.value})}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={4}>
                    <InputGroup>
                      <InputGroup.Text className="bg-transparent border-0 text-warning">
                        <Calendar size={20} />
                      </InputGroup.Text>
                      <Form.Control
                        type="date"
                        className="form-control-premium border-0"
                        value={search.date}
                        onChange={(e) => setSearch({...search, date: e.target.value})}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={3}>
                    <Button type="submit" className="btn-premium w-100 h-100 d-flex align-items-center justify-content-center gap-2">
                      <Search size={20} />
                      <span>Explore</span>
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Bike Listing */}
      <section className="py-5 bg-dark">
        <Container>
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-5 gap-4">
            <div>
              <h2 className="display-5 fw-bold text-white mb-2">Featured <span className="text-warning">Fleet</span></h2>
              <p className="text-white-50">Hand-picked collection for your every adventure</p>
            </div>
          </div>

          <Row className="g-4">
            {bikes.length > 0 ? (
              bikes.map((bike) => (
                <Col key={bike.id} xs={12} sm={6} lg={4}>
                  <BikeCard bike={bike} onRent={handleRent} />
                </Col>
              ))
            ) : (
              <Col xs={12} className="text-center py-5">
                <p className="text-white-50 fs-5">No bikes available. Try adjusting your search.</p>
              </Col>
            )}
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection limit={3} />
    </div>
  );
};

export default LandingPage;
