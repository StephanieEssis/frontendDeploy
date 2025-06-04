import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUserFriends, faBed, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { roomService } from '../../services/roomService';
import { useAppContext } from '../../hooks/useAppContext';

const RoomBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAppContext();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  useEffect(() => {
    const loadRoom = async () => {
      try {
        setLoading(true);
        const data = await roomService.getRoomById(id);
        setRoom(data);
        setError(null);
      } catch (err) {
        setError('Erreur lors du chargement de la chambre');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadRoom();
  }, [id]);

  const validateDates = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    
    if (checkIn < today) {
      return "La date d'arrivée ne peut pas être dans le passé";
    }
    
    if (checkOut <= checkIn) {
      return "La date de départ doit être après la date d'arrivée";
    }
    
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
    setBookingError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBookingError(null);

    // Validation de l'utilisateur
    if (!user) {
      setBookingError('Veuillez vous connecter pour effectuer une réservation');
      return;
    }

    // Validation des dates
    const dateError = validateDates();
    if (dateError) {
      setBookingError(dateError);
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch('https://backendlabphase.onrender.com/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          roomId: id,
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          guests: parseInt(bookingData.guests),
          specialRequests: bookingData.specialRequests
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Réservation confirmée !");
        navigate('/');
      } else {
        setBookingError(data.message || 'Erreur lors de la réservation');
      }
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      setBookingError("Une erreur est survenue lors de la réservation");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-8">Chargement...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;
  if (!room) return <div className="text-center py-8">Chambre non trouvée</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 mb-6"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Retour
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">{room.name}</h1>
          <img 
            src={room.image} 
            alt={room.name} 
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <p className="text-gray-700 mb-6">{room.description}</p>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Équipements</h2>
            <ul className="grid grid-cols-2 gap-2">
              {room.amenities?.map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-blue-700">
              {room.price} FCFA <span className="text-sm font-normal text-gray-600">/nuit</span>
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Réserver maintenant</h2>
          
          {bookingError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {bookingError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                Date d'arrivée
              </label>
              <input
                type="date"
                name="checkIn"
                value={bookingData.checkIn}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                Date de départ
              </label>
              <input
                type="date"
                name="checkOut"
                value={bookingData.checkOut}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
                min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                disabled={!bookingData.checkIn}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                <FontAwesomeIcon icon={faUserFriends} className="mr-2" />
                Nombre de personnes
              </label>
              <select
                name="guests"
                value={bookingData.guests}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                {[1, 2, 3, 4].map(num => (
                  <option key={num} value={num}>{num} {num > 1 ? 'personnes' : 'personne'}</option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                <FontAwesomeIcon icon={faBed} className="mr-2" />
                Demandes spéciales
              </label>
              <textarea
                name="specialRequests"
                value={bookingData.specialRequests}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows="3"
                placeholder="Lit bébé, accès handicapé, etc."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Réservation en cours...' : 'Confirmer la réservation'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoomBooking; 