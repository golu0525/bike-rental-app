import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { Star, Heart } from 'lucide-react';
import { testimonials } from '../data/testimonials';

const TestimonialsPage: React.FC = () => {
  return (
    <div className="testimonials-page bg-dark min-vh-100">
      {/* Hero Section */}
      <section className="hero-gradient py-5 py-md-5 text-white text-center">
        <Container>
          <Badge
            bg="warning"
            text="dark"
            className="px-3 py-2 rounded-pill mb-4 fw-bold text-uppercase letter-spacing-1"
          >
            Customer Reviews
          </Badge>
          <h1 className="display-3 fw-black mb-4">
            What Our <span className="text-warning">Riders</span> Love
          </h1>
          <p className="lead text-white-50 mb-0 fs-5">
            Real experiences from thousands of happy customers across India choosing BikeRentIN
            for their adventures.
          </p>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-dark-accent">
        <Container>
          <Row className="text-center text-white g-4">
            <Col md={3} sm={6}>
              <h3 className="display-5 fw-bold text-warning mb-2">50K+</h3>
              <p className="text-white-50">Happy Riders</p>
            </Col>
            <Col md={3} sm={6}>
              <h3 className="display-5 fw-bold text-warning mb-2">4.8★</h3>
              <p className="text-white-50">Average Rating</p>
            </Col>
            <Col md={3} sm={6}>
              <h3 className="display-5 fw-bold text-warning mb-2">500K+</h3>
              <p className="text-white-50">Successful Rides</p>
            </Col>
            <Col md={3} sm={6}>
              <h3 className="display-5 fw-bold text-warning mb-2">15+</h3>
              <p className="text-white-50">Cities Served</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Grid */}
      <section className="py-5 bg-dark bg-light">
        <Container>
          <Row className="g-4">
            {testimonials.map((testimonial) => (
              <Col key={testimonial.id} xs={12} md={6} lg={4} className="d-flex">
                <div
                  className="card bg-dark-accent border-2 border-warning w-100 p-4 rounded-4 position-relative"
                  style={{ borderStyle: 'solid' }}
                >
                  {/* Heart Icon */}
                  <Heart
                    size={24}
                    className="text-warning opacity-50 position-absolute"
                    style={{ top: '1rem', right: '1rem' }}
                  />

                  {/* Stars */}
                  <div className="d-flex gap-1 mb-3">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className="text-warning"
                        fill="currentColor"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-white-75 mb-4 flex-grow-1 lh-lg txt-dark">
                    "{testimonial.quote}"
                  </p>

                  {/* Author & Source */}
                  <div className="border-top border-white-25 pt-3 txt-dark">
                    <p className="mb-1 fw-bold text-white txt-dark">{testimonial.author}</p>
                    <p className="text-white-50 small txt-dark">{testimonial.source}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="hero-gradient py-5 text-center text-white">
        <Container>
          <h2 className="display-5 fw-bold mb-4">
            Join Thousands of Happy <span className="text-warning">Riders</span>
          </h2>
          <p className="lead text-white-50 mb-5 fs-5">
            Your next adventure is just one booking away. Experience premium bike rentals today.
          </p>
          <a href="/" className="btn btn-warning btn-lg fw-bold px-5 py-3">
            Start Your Journey
          </a>
        </Container>
      </section>
    </div>
  );
};

export default TestimonialsPage;
