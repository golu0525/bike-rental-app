import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { MapPin, Zap, Clock, Bike as BikeIcon } from 'lucide-react';

interface BikeCardProps {
  bike: {
    id: number;
    model: string;
    type: string;
    hourly_rate: number;
    location: string;
    image_url?: string;
  };
  onRent: (id: number) => void;
}

const BikeCard: React.FC<BikeCardProps> = ({ bike, onRent }) => {
  return (
    <Card className="premium-card h-100 shadow-lg bg-dark text-white border-0">
      <div className="position-relative overflow-hidden" style={{ height: '220px' }}>
        {bike.image_url ? (
          <Card.Img 
            variant="top" 
            src={bike.image_url} 
            alt={bike.model} 
            className="h-100 w-100 object-fit-cover transition-all" 
          />
        ) : (
          <div className="h-100 w-100 d-flex align-items-center justify-center bg-secondary-subtle">
            <BikeIcon size={64} className="opacity-25" />
          </div>
        )}
        <Badge 
          bg="warning" 
          text="dark" 
          className="position-absolute fs-6 fw-bold p-2" 
          style={{ top: '1rem', right: '1rem', borderRadius: '10px' }}
        >
          ₹{bike.hourly_rate}/hr
        </Badge>
      </div>

      <Card.Body className="d-flex flex-column gap-3 p-4">
        <div>
          <Card.Title className="fs-4 fw-bold mb-1 text-white">{bike.model}</Card.Title>
          <div className="d-flex align-items-center gap-2 text-warning small fw-semibold">
            <Zap size={14} />
            {bike.type}
          </div>
        </div>

        <div className="d-flex align-items-center gap-2 text-white-50">
          <MapPin size={18} className="text-warning" />
          <span>{bike.location}</span>
        </div>

        <div className="mt-auto d-flex align-items-center justify-content-between pt-3 border-top border-white-10">
          <div className="d-flex align-items-center gap-2 small text-white-50">
            <Clock size={14} />
            <span>Available Now</span>
          </div>
          <Button 
            className="btn-premium py-2 px-4 shadow-sm"
            onClick={() => onRent(bike.id)}
          >
            Rent Now
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BikeCard;
