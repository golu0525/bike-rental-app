import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Zap, MapPin, Users, Award, TrendingUp, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUs: React.FC = () => {
  return (
    <div className="bg-light">
      {/* 1️⃣ Hero Section */}
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

      {/* 2️⃣ Our Story */}
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

      {/* 3️⃣ Our Mission */}
      <section className="bg-dark text-white py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold mb-3 text-white">Our Mission</h2>
            <div className="premium-glass p-5 rounded-4" style={{ maxWidth: '700px', margin: '0 auto' }}>
              <p className="fs-5 mb-0 text-white">
                To make bikes the first choice for urban mobility by offering affordable, dependable, and effortless access to quality bikes. We believe in simplicity, reliability, and the freedom that comes with every ride.
              </p>
            </div>
          </div>
          <Row className="mt-5">
            <Col md={4} className="mb-4">
              <div className="text-center">
                <Zap size={48} className="text-primary mb-3" />
                <h5 className="fw-bold text-white">Simplicity</h5>
                <p className="text-white">Book in seconds, ride in minutes</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="text-center">
                <Award size={48} className="text-primary mb-3" />
                <h5 className="fw-bold text-white">Reliability</h5>
                <p className="text-white">Every bike is maintained to the highest standards</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="text-center">
                <Heart size={48} className="text-primary mb-3" />
                <h5 className="fw-bold text-white">Freedom</h5>
                <p className="text-white">Ride your way, on your schedule</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 4️⃣ What We Offer */}
      <section className="py-5 bg-white">
        <Container>
          <h2 className="display-6 fw-bold text-center mb-5 text-dark">What We Offer</h2>
          <Row>
            <Col md={6} className="mb-4">
              <Card className="premium-card h-100 p-4">
                <h5 className="fw-bold mb-3 text-white white-txt">📅 Flexible Rental Durations</h5>
                <p className="text-white-50 mb-0">
                  Whether you need a bike for an hour, a day, a week, or a month, we have a plan that fits. Pay as you go or save with our subscription options.
                </p>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="premium-card h-100 p-4">
                <h5 className="fw-bold mb-3 text-white white-txt">🚴 Diverse Bike Fleet</h5>
                <p className="text-white-50 mb-0">
                  From lightweight road bikes to sturdy mountain bikes, choose the perfect ride for your adventure. All bikes are premium quality and regularly serviced.
                </p>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="premium-card h-100 p-4">
                <h5 className="fw-bold mb-3 text-white white-txt">💰 Transparent Pricing</h5>
                <p className="text-white-50 mb-0">
                  No hidden fees. Know your costs upfront. Flexible discounts for long-term rentals and frequent riders.
                </p>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="premium-card h-100 p-4">
                <h5 className="fw-bold mb-3 text-white white-txt">🔐 Safe & Secure</h5>
                <p className="text-white-50 mb-0">
                  Every bike is equipped with GPS tracking and a sturdy lock. Your safety and peace of mind are our top priorities.
                </p>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 5️⃣ How It Works */}
      <section className="bg-white py-5">
        <Container>
          <h2 className="display-6 fw-bold text-center mb-5 text-dark">How It Works</h2>
          <Row className="g-4">
            <Col md={2} xs={6} className="text-center">
              <div className="bg-primary rounded-circle p-4 d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '80px', height: '80px' }}>
                <span className="text-white fw-bold fs-4">1</span>
              </div>
              <h6 className="fw-bold text-dark">Download</h6>
              <p className="small text-muted txt-dark">Get the Bike Rental App</p>
            </Col>
            <Col md={2} xs={6} className="text-center">
              <div className="bg-primary rounded-circle p-4 d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '80px', height: '80px' }}>
                <span className="text-white fw-bold fs-4">2</span>
              </div>
              <h6 className="fw-bold text-dark">Choose Location</h6>
              <p className="small text-muted txt-dark">Pick your pickup point</p>
            </Col>
            <Col md={2} xs={6} className="text-center">
              <div className="bg-primary rounded-circle p-4 d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '80px', height: '80px' }}>
                <span className="text-white fw-bold fs-4">3</span>
              </div>
              <h6 className="fw-bold text-dark">Select Bike</h6>
              <p className="small text-muted txt-dark">Pick your perfect ride</p>
            </Col>
            <Col md={2} xs={6} className="text-center">
              <div className="bg-primary rounded-circle p-4 d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '80px', height: '80px' }}>
                <span className="text-white fw-bold fs-4">4</span>
              </div>
              <h6 className="fw-bold text-dark">Book</h6>
              <p className="small text-muted txt-dark">Confirm your booking</p>
            </Col>
            <Col md={2} xs={6} className="text-center">
              <div className="bg-primary rounded-circle p-4 d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '80px', height: '80px' }}>
                <span className="text-white fw-bold fs-4">5</span>
              </div>
              <h6 className="fw-bold text-dark">Ride</h6>
              <p className="small text-muted txt-dark">Enjoy your adventure!</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 6️⃣ Why Choose Us */}
      <section className="py-5 bg-white">
        <Container>
          <h2 className="display-6 fw-bold text-center mb-5 text-dark">Why Choose Bike Rental App?</h2>
          <Row>
            <Col lg={3} md={6} className="mb-4">
              <div className="text-center">
                <MapPin size={48} className="text-primary mb-3 d-block mx-auto" />
                <h6 className="fw-bold mb-2 text-dark">Nationwide Coverage</h6>
                <p className="text-muted small txt-dark">Available in 15+ cities and growing</p>
              </div>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <div className="text-center">
                <Users size={48} className="text-primary mb-3 d-block mx-auto" />
                <h6 className="fw-bold mb-2 text-dark">24/7 Support</h6>
                <p className="text-muted small txt-dark">Our team is always here to help</p>
              </div>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <div className="text-center">
                <Award size={48} className="text-primary mb-3 d-block mx-auto" />
                <h6 className="fw-bold mb-2 text-dark">Quality Guaranteed</h6>
                <p className="text-muted small txt-dark">Every bike passes rigorous safety checks</p>
              </div>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <div className="text-center">
                <Zap size={48} className="text-primary mb-3 d-block mx-auto" />
                <h6 className="fw-bold mb-2 text-dark">Fast Booking</h6>
                <p className="text-muted small txt-dark">Book and ride in under 2 minutes</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 7️⃣ Impact & Reach */}
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
          <p className="text-center text-white mt-4">
            Together, our community has saved thousands of tons of CO₂ emissions and contributed to cleaner, healthier cities.
          </p>
        </Container>
      </section>

      {/* 8️⃣ Founders' Vision */}
      <section className="py-5 bg-white">
        <Container>
          <h2 className="display-6 fw-bold text-center mb-5 text-dark">Our Vision for the Future</h2>
          <Row>
            <Col md={6} className="mb-4">
              <Card className="premium-card p-4 h-100">
                <p className="fs-5 mb-0 fst-italic text-white">
                  "Every city should be bikeable. When you remove the friction of owning a bike, you unlock a world of freedom, health, and connection."
                </p>
                <p className="text-white-50 mt-3 mb-0">— Founder & CEO</p>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="premium-card p-4 h-100">
                <p className="fs-5 mb-0 fst-italic text-white">
                  "We're not just renting bikes; we're building a community of riders who believe in sustainable, accessible, and joyful mobility."
                </p>
                <p className="text-white-50 mt-3 mb-0">— Co-Founder & Operations Lead</p>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 9️⃣ Future Plans */}
      <section className="bg-white py-5">
        <Container>
          <h2 className="display-6 fw-bold text-center mb-5 text-dark">What's Next</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="premium-card p-4">
                <TrendingUp size={40} className="text-primary mb-3" />
                <h6 className="fw-bold mb-2 text-white white-txt">Expansion</h6>
                <p className="text-white-50 small mb-0">
                  Bringing Bike Rental App to 25+ cities by next year
                </p>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="premium-card p-4">
                <Zap size={40} className="text-primary mb-3" />
                <h6 className="fw-bold mb-2 text-white white-txt">Advanced Features</h6>
                <p className="text-white-50 small mb-0">
                  AI-powered bike recommendations and route optimization
                </p>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="premium-card p-4">
                <Heart size={40} className="text-primary mb-3" />
                <h6 className="fw-bold mb-2 text-white white-txt">Community</h6>
                <p className="text-white-50 small mb-0">
                  Building local events and rider communities nationwide
                </p>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 🔟 Call to Action */}
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
          <p className="text-white-50 mt-4 txt-dark">
            Questions? <Link to="/login" className="text-white fw-bold text-decoration-none txt-dark">Contact our team</Link>
          </p>
        </Container>
      </section>
    </div>
  );
};

export default AboutUs;
