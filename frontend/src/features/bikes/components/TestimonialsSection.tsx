import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Star } from 'lucide-react';
import { testimonials } from '../data/testimonials';

const TestimonialsSection: React.FC<{ limit?: number }> = ({ limit }) => {
  const displayedTestimonials = limit ? testimonials.slice(0, limit) : testimonials;

  return (
    <section className="py-5 bg-dark">
      <Container>
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-white mb-3">
            What our users have to <span className="text-warning">say</span>
          </h2>
          <p className="text-white-50 fs-5">Real feedback from real riders across India</p>
        </div>

        <Row className="g-4">
          {displayedTestimonials.map((testimonial) => (
            <Col key={testimonial.id} xs={12} md={6} lg={4} className="d-flex">
              <div
                className="card bg-dark-accent border-2 border-warning w-100 p-4 rounded-4"
                style={{ borderStyle: 'solid' }}
              >
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
                <div className="border-top border-white-25 pt-3">
                  <p className="mb-1 fw-bold text-white txt-dark">{testimonial.author}</p>
                  <p className="text-white-50 small txt-dark">{testimonial.source}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
