export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  source: string;
  rating?: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      'Vehicle was in very good condition and all the staff was very humble. Our vehicle got punctured but we got full assistance and after contacting their staff. We also get the full refund. Absolutely reliable in Bangalore.',
    author: 'Akshay Kumar',
    source: 'Google play store',
    rating: 5
  },
  {
    id: 2,
    quote:
      'I have just made a booking, because of connecting flights being late, I needed to shift the whole booking by a day. First of all the app and website are good, I found the app especially user friendly and the inventory is good too. On top when I needed the modification of the booking I was helped exceptionally well by Denzil in customer care. He understood the delay, helped cancel the last booking with no penalties. This took away the stress associated with such situations.',
    author: 'Gaurav Kumar',
    source: 'Apple app store',
    rating: 5
  },
  {
    id: 3,
    quote:
      'Hello all, I had booked a bike for 14th Oct. Just then I noticed I booked for the wrong date and my ride will start in an 1 hrs time. It was indeed one of those day you know you have messed up. I reached out to royal brothers to see if there is anyhow I can get this fixed. Thanks to my saviour Denzil from RB, in a flash he had my concern fixed and ready to move on. I was assisted in cancelling a ride one hr prior to scheduled time. Thank you Denzil & RB - you guys are doing great stuff!',
    author: 'Yathi Premlal',
    source: 'Google play store',
    rating: 5
  },
  {
    id: 4,
    quote:
      'Exceptional service and premium bikes. The entire rental process was seamless from booking to return. Highly recommend for any road enthusiast in India.',
    author: 'Rajesh Singh',
    source: 'Google play store',
    rating: 5
  },
  {
    id: 5,
    quote:
      'Outstanding experience! The team was incredibly responsive to all my queries. The bike was well-maintained and the rates are very competitive. Will definitely book again.',
    author: 'Priya Sharma',
    source: 'Apple app store',
    rating: 5
  },
  {
    id: 6,
    quote:
      'Best bike rental service I have used. Great customer support, clean bikes, and flexible booking options. Really impressed with the professionalism.',
    author: 'Arjun Patel',
    source: 'Google play store',
    rating: 5
  }
];
