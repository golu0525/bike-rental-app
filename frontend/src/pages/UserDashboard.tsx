import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock, CheckCircle2, XCircle, IndianRupee, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const UserDashboard: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscriptions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/subscriptions/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubscriptions(response.data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

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
        <h1 className="text-4xl font-bold">My <span className="text-accent">Subscriptions</span></h1>
        <div className="text-foreground/60 text-sm">Welcome back, {JSON.parse(localStorage.getItem('user') || '{}').name}</div>
      </div>

      {subscriptions.length > 0 ? (
        <div className="grid gap-6">
          {subscriptions.map((sub: any) => (
            <div key={sub.id} className="glass p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 glass-hover">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center text-accent">
                  <Calendar size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{sub.model}</h3>
                  <p className="text-foreground/60 text-sm">{sub.location}</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="text-center md:text-left">
                  <p className="text-xs uppercase tracking-wider text-foreground/40 mb-1">Duration</p>
                  <p className="text-sm font-semibold">
                    {format(new Date(sub.start_time), 'MMM d, h:mm a')} - {format(new Date(sub.end_time), 'MMM d, h:mm a')}
                  </p>
                </div>

                <div className="text-center md:text-left">
                  <p className="text-xs uppercase tracking-wider text-foreground/40 mb-1">Total Paid</p>
                  <p className="text-lg font-bold text-accent">₹{sub.total_amount}</p>
                </div>

                <div>
                  {getStatusBadge(sub.status)}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass rounded-3xl border-dashed border-2 border-border">
          <p className="text-xl text-foreground/60 mb-6">You haven't rented any bikes yet.</p>
          <a href="/" className="btn-primary">Explore Bikes</a>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
