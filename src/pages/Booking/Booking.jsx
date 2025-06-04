import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { roomService } from '../../services/roomService';

const Booking = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        setLoading(true);
        const data = await roomService.getAllRooms();
        setRooms(data);
        setError(null);
      } catch (err) {
        setError('Erreur lors du chargement des chambres');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, []);

  if (loading) return <div className="text-center py-8">Chargement...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Nos Chambres</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room) => (
          <div key={room._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src={room.image} 
              alt={room.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{room.name}</h2>
              <p className="text-gray-600 mb-4">{room.description}</p>
              
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Équipements :</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {room.amenities?.map((item, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold text-blue-600">
                  {room.price} FCFA <span className="text-sm font-normal text-gray-600">/nuit</span>
                </div>
                <button
                  onClick={() => navigate(`/booking/${room._id}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300"
                >
                  Réserver
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Booking;
