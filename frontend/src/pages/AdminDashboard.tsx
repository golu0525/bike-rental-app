import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Bike, MapPin, IndianRupee } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [bikes, setBikes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentBike, setCurrentBike] = useState({
    model: '',
    type: 'Scooter',
    hourly_rate: '',
    location: '',
    image_url: ''
  });

  const fetchBikes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bikes');
      setBikes(response.data);
    } catch (error) {
      console.error('Error fetching bikes:', error);
    }
  };

  useEffect(() => {
    fetchBikes();
  }, []);

  const handleAddBike = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/bikes', currentBike, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowModal(false);
      fetchBikes();
      setCurrentBike({ model: '', type: 'Scooter', hourly_rate: '', location: '', image_url: '' });
    } catch (error) {
      console.error('Error adding bike:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this bike?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/bikes/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchBikes();
      } catch (error) {
        console.error('Error deleting bike:', error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold">Admin <span className="text-accent">Inventory</span></h1>
        <button 
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Add New Bike
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bikes.map((bike: any) => (
          <div key={bike.id} className="glass p-6 rounded-2xl flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{bike.model}</h3>
                <p className="text-accent font-semibold">₹{bike.hourly_rate}/hr</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors">
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(bike.id)}
                  className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-foreground/60 text-sm">
              <MapPin size={16} />
              {bike.location}
            </div>
            
            <div className={`text-xs font-bold uppercase rounded-full px-3 py-1 w-fit ${bike.is_available ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-500'}`}>
              {bike.is_available ? 'Available' : 'Rented Out'}
            </div>
          </div>
        ))}
      </div>

      {/* Basic Modal for Adding Bike */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
          <div className="glass p-8 rounded-3xl w-full max-w-lg shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">Add New <span className="text-accent">Ride</span></h2>
            <form onSubmit={handleAddBike} className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-sm font-semibold mb-1 block">Model Name</label>
                <input 
                  type="text" required className="input-field" 
                  value={currentBike.model} 
                  onChange={(e) => setCurrentBike({...currentBike, model: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1 block">Type</label>
                <select 
                  className="input-field"
                  value={currentBike.type}
                  onChange={(e) => setCurrentBike({...currentBike, type: e.target.value})}
                >
                  <option>Scooter</option>
                  <option>Sports</option>
                  <option>Cruiser</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold mb-1 block">Hourly Rate (₹)</label>
                <input 
                  type="number" required className="input-field"
                  value={currentBike.hourly_rate}
                  onChange={(e) => setCurrentBike({...currentBike, hourly_rate: e.target.value})}
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-semibold mb-1 block">Location</label>
                <input 
                  type="text" required className="input-field"
                  value={currentBike.location}
                  onChange={(e) => setCurrentBike({...currentBike, location: e.target.value})}
                />
              </div>
              <div className="col-span-2 flex gap-4 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 text-foreground/60 font-bold hover:text-foreground">Cancel</button>
                <button type="submit" className="btn-primary flex-1">Save Bike</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
