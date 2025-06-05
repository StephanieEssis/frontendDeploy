import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUserFriends, faBed, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import { roomService } from '../../services/roomService';
// import { useAppContext } from '../../hooks/useAppContext';

const RoomBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const { user } = useAppContext();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    specialRequests: '',
    category: 'standard'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);

  // Données simulées des chambres
  const roomsData = useMemo(() => [
    {
      id: 1,
      name: 'Chambre Standard',
      description: 'Confort essentiel pour un séjour agréable avec lit queen, salle de bain privée et vue sur la ville.',
      price: 75000,
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop',
      amenities: ['Wi-Fi', 'TV', 'Climatisation', 'Sèche-cheveux'],
      category: 'standard'
    },
    {
      id: 2,
      name: 'Chambre Deluxe',
      description: 'Espace supplémentaire et commodités premium avec lit king et vue panoramique.',
      price: 80000,
      image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&h=600&fit=crop',
      amenities: ['Wi-Fi', 'TV écran plat', 'Mini-bar', 'Climatisation', 'Salle de bain marbre'],
      category: 'deluxe'
    },
    {
      id: 3,
      name: 'Suite Junior',
      description: 'Séjour luxueux avec salon séparé et chambre spacieuse.',
      price: 85000,
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop',
      amenities: ['Wi-Fi premium', 'TV 55"', 'Espace bureau', 'Service en chambre'],
      category: 'suite'
    },
    {
      id: 4,
      name: 'Suite Familiale',
      description: 'Idéal pour les familles avec enfants, comprenant deux chambres séparées.',
      price: 90000,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
      amenities: ['Wi-Fi', '2 TV', 'Espace jeu', 'Lit bébé sur demande'],
      category: 'family'
    }
  ], []);

  useEffect(() => {
    const loadRoom = async () => {
      try {
        setLoading(true);
        const roomId = parseInt(id, 10);
        const selectedRoom = roomsData.find(r => r.id === roomId);
        if (selectedRoom) {
          setRoom(selectedRoom);
          setError(null);
        } else {
          setError('Chambre non trouvée');
        }
      } catch (err) {
        setError('Erreur lors du chargement de la chambre');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadRoom();
  }, [id, roomsData]);

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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          roomId: id,
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          guests: parseInt(bookingData.guests),
          specialRequests: bookingData.specialRequests,
          category: bookingData.category
        })
      });

      const data = await response.json();

      if (response.ok) {
        setShowReceipt(true);
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

  // Calculer le nombre de nuits
  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const diffTime = Math.abs(checkOut - checkIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Calculer le prix total
  const calculateTotal = () => {
    const nights = calculateNights();
    return room ? room.price * nights : 0;
  };

  if (loading) return <div className="text-center py-8">Chargement...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;
  if (!room) return <div className="text-center py-8">Chambre non trouvée</div>;

  // Composant du reçu
  const Receipt = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Récapitulatif de Réservation</h2>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="font-semibold text-lg">{room.name}</h3>
            <p className="text-gray-600">{room.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Date d'arrivée</p>
              <p>{new Date(bookingData.checkIn).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="font-semibold">Date de départ</p>
              <p>{new Date(bookingData.checkOut).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="font-semibold">Nombre de nuits</p>
              <p>{calculateNights()}</p>
            </div>
            <div>
              <p className="font-semibold">Nombre de personnes</p>
              <p>{bookingData.guests}</p>
            </div>
            <div>
              <p className="font-semibold">Catégorie</p>
              <p className="capitalize">{bookingData.category}</p>
            </div>
            <div>
              <p className="font-semibold">Prix par nuit</p>
              <p>{room.price} FCFA</p>
            </div>
          </div>
          <div className="border-t pt-4">
            <p className="font-bold text-xl">Total: {calculateTotal()} FCFA</p>
          </div>
          {bookingData.specialRequests && (
            <div className="border-t pt-4">
              <p className="font-semibold">Demandes spéciales</p>
              <p className="text-gray-600">{bookingData.specialRequests}</p>
            </div>
          )}
        </div>
        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={() => setShowReceipt(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Fermer
          </button>
          <button
            onClick={() => {
              setShowReceipt(false);
              navigate('/');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {showReceipt && <Receipt />}
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
                <FontAwesomeIcon icon={faBed} className="mr-2" />
                Catégorie de chambre
              </label>
              <select
                name="category"
                value={bookingData.category}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="standard">Standard</option>
                <option value="deluxe">Deluxe</option>
                <option value="suite">Suite</option>
                <option value="family">Familiale</option>
              </select>
            </div>

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