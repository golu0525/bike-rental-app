import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, XCircle, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { bookingApi } from '../api/booking.api';
import type { Booking } from '../booking.types';

const UserDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const response = await bookingApi.getBookings(token);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id: number) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        await bookingApi.cancelBooking(id, token);
        setBookings(bookings.filter(b => b.id !== id));
      } catch (error) {
        console.error('Error cancelling booking:', error);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Clock size={14} /> Active</span>;
      case 'COMPLETED':
        return <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><CheckCircle2 size={14} /> Completed</span>;
      case 'CANCELLED':
        return <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><XCircle size={14} /> Cancelled</span>;
      default:
        return status;
    }
  };

  if (loading) return <div className="p-10 text-center text-accent animate-pulse text-xl">Loading your dashboard...</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold">My <span className="text-accent">Bookings</span></h1>
        <div className="text-foreground/60 text-sm">Welcome back, {JSON.parse(localStorage.getItem('user') || '{}').name}</div>
      </div>

      {bookings.length > 0 ? (
        <div className="grid gap-6">
          {bookings.map((booking: any) => (
            <div key={booking.id} className="glass p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 glass-hover">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center text-accent">
                  <Calendar size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{booking.model}</h3>
                  <p className="text-foreground/60 text-sm">{booking.location}</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="text-center md:text-left">
                  <p className="text-xs uppercase tracking-wider text-foreground/40 mb-1">Duration</p>
                  <p className="text-sm font-semibold">
                    {format(new Date(booking.start_time), 'MMM d, h:mm a')} - {format(new Date(booking.end_time), 'MMM d, h:mm a')}
                  </p>
                </div>

                <div className="text-center md:text-left">
                  <p className="text-xs uppercase tracking-wider text-foreground/40 mb-1">Total Paid</p>
                  <p className="text-lg font-bold text-accent">₹{booking.total_amount}</p>
                </div>

                <div>
                  {getStatusBadge(booking.status)}
                </div>

                {booking.status === 'ACTIVE' && (
                  <button
                    onClick={() => handleCancel(booking.id)}
                    className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors text-sm font-semibold"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass rounded-3xl border-dashed border-2 border-border">
          <p className="text-xl text-foreground/60 mb-6">You haven't booked any bikes yet.</p>
          <a href="/" className="btn-primary inline-block">Explore Bikes</a>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
