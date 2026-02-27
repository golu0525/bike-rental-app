import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AboutUs: React.FC = () => {
  return (
    <div className="bg-light">
      {/* Hero Section */}
      <section className="hero-gradient py-5 text-white text-center">
        <Container>
          <h1 className="display-4 fw-bold mb-3 abt-h1 txt-dark">
            Ride Free. <span className="text-primary">Live Free.</span>
          </h1>
          <p className="lead mb-4 txt-dark">
            Experience the ultimate freedom of urban mobility with Bike Rental App — your on-demand access to quality bikes, anytime, anywhere.
          </p>
          <Link to="/signup" className="btn btn-primary btn-lg">
            Start Your Journey Today
          </Link>
        </Container>
      </section>

      {/* Our Story */}
      <section className="py-5 bg-white bg-black">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <h2 className="display-6 fw-bold mb-4 text-dark">Our Story</h2>
              <p className="text-muted fs-5 mb-3 txt-dark">
                Bike Rental App was born from a simple observation: people love bikes, but hate the hassle of ownership. High maintenance costs, storage challenges, and unpredictable travel expenses were holding riders back from experiencing the freedom and joy that cycling brings.
              </p>
              <p className="text-muted fs-5 mb-3 txt-dark">
                What started as a small initiative with just 50 bikes across one city has grown into a nationwide movement. Today, we've partnered with thousands of riders who choose bikes over cars, one trip at a time.
              </p>
              <p className="text-muted fs-5 txt-dark">
                Our journey is rooted in a belief: mobility shouldn't be complicated. It should be accessible, affordable, and enjoyable. That's what we're building.
              </p>
            </Col>
            <Col md={6}>
              <div className="premium-glass p-5 rounded-4 text-center">
                <div style={{ fontSize: '4rem' }} className="mb-3">🚴‍♂️</div>
                <h4 className="fw-bold txt-dark">From Small Beginnings to National Impact</h4>
                <p className="text-white-50 mt-2 txt-dark">Serving thousands of riders across 15+ cities</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Impact & Reach */}
      <section className="bg-dark text-white py-5">
        <Container>
          <h2 className="display-6 fw-bold text-center mb-5 text-white">Our Impact</h2>
          <Row className="text-center">
            <Col md={3} sm={6} className="mb-4">
              <h3 className="display-5 fw-bold text-primary">15+</h3>
              <p className="fs-5">Cities Served</p>
            </Col>
            <Col md={3} sm={6} className="mb-4">
              <h3 className="display-5 fw-bold text-primary">50K+</h3>
              <p className="fs-5">Happy Riders</p>
            </Col>
            <Col md={3} sm={6} className="mb-4">
              <h3 className="display-5 fw-bold text-primary">500K+</h3>
              <p className="fs-5">Rides Completed</p>
            </Col>
            <Col md={3} sm={6} className="mb-4">
              <h3 className="display-5 fw-bold text-primary">4.8★</h3>
              <p className="fs-5">Average Rating</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="hero-gradient py-5 text-center bg-light">
        <Container>
          <h2 className="display-5 fw-bold mb-3 txt-dark">Ready to Experience Freedom?</h2>
          <p className="lead mb-4 text-white txt-dark">
            Join thousands of riders who've already discovered the joy of bike rentals.
          </p>
          <Row className="justify-content-center">
            <Col md={6}>
              <Link to="/signup" className="btn btn-light btn-lg w-100 mb-2">
                Download the App
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default AboutUs;
