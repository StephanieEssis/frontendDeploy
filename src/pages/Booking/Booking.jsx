// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { roomService } from '../../services/roomService';

// const Booking = () => {
//   const navigate = useNavigate();
//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadRooms = async () => {
//       try {
//         setLoading(true);
//         const data = await roomService.getAllRooms();
//         setRooms(data);
//         setError(null);
//       } catch (err) {
//         setError('Erreur lors du chargement des chambres');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadRooms();
//   }, []);

//   if (loading) return <div className="text-center py-8">Chargement...</div>;
//   if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h1 className="text-3xl font-bold mb-8">Nos Chambres</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {rooms.map((room) => (
//           <div key={room._id} className="bg-white rounded-lg shadow-md overflow-hidden">
//             <img 
//               src={room.image} 
//               alt={room.name} 
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-6">
//               <h2 className="text-xl font-bold mb-2">{room.name}</h2>
//               <p className="text-gray-600 mb-4">{room.description}</p>
              
//               <div className="mb-4">
//                 <h3 className="font-semibold mb-2">Équipements :</h3>
//                 <ul className="grid grid-cols-2 gap-2">
//                   {room.amenities?.map((item, index) => (
//                     <li key={index} className="flex items-center text-sm text-gray-600">
//                       <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="flex justify-between items-center">
//                 <div className="text-2xl font-bold text-blue-600">
//                   {room.price} FCFA <span className="text-sm font-normal text-gray-600">/nuit</span>
//                 </div>
//                 <button
//                   onClick={() => navigate(`/booking/${room._id}`)}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300"
//                 >
//                   Réserver
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Booking;









import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUserFriends, faBed, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Booking = ({ isLoggedIn }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [room, setRoom] = useState(null);
  const [bookingData, setBookingData] = useState({
    checkIn: searchParams.get('checkIn') || '',
    checkOut: searchParams.get('checkOut') || '',
    guests: parseInt(searchParams.get('guests')) || 1,
    specialRequests: ''
  });

  // Données simulées des chambres
  const roomsData = [
    {
      id: 1,
      name: 'Chambre Standard',
      description: 'Confort essentiel pour un séjour agréable avec lit queen, salle de bain privée et vue sur la ville.',
      price: 60000,
      image: 'https://source.unsplash.com/random/800x600/?hotel,standard',
      amenities: ['Wi-Fi', 'TV', 'Climatisation', 'Sèche-cheveux']
    },
    {
      id: 2,
      name: 'Chambre Deluxe',
      description: 'Espace supplémentaire et commodités premium avec lit king et vue panoramique.',
      price: 80000,
      image: 'https://source.unsplash.com/random/800x600/?hotel,deluxe',
      amenities: ['Wi-Fi', 'TV écran plat', 'Mini-bar', 'Climatisation', 'Salle de bain marbre']
    },
    {
      id: 3,
      name: 'Suite Junior',
      description: 'Séjour luxueux avec salon séparé et chambre spacieuse.',
      price: 85000,
      image: 'https://source.unsplash.com/random/800x600/?hotel,suite',
      amenities: ['Wi-Fi premium', 'TV 55"', 'Espace bureau', 'Service en chambre']
    },
    {
      id: 4,
      name: 'Suite Familiale',
      description: 'Idéal pour les familles avec enfants, comprenant deux chambres séparées.',
      price: 75000,
      image: 'https://source.unsplash.com/random/800x600/?hotel,family',
      amenities: ['Wi-Fi', '2 TV', 'Espace jeu', 'Lit bébé sur demande']
    }
  ];

  useEffect(() => {
    if (id) {
      const roomId = parseInt(id, 10);
      const selectedRoom = roomsData.find(r => r.id === roomId);
      if (selectedRoom) {
        setRoom(selectedRoom);
      } else {
        // Si id invalide, retourne à la liste
        navigate('/booking');
      }
    } else {
      // Pas d'id = affichage de la liste, pas de chambre sélectionnée
      setRoom(null);
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('Veuillez vous connecter pour effectuer une réservation');
      return;
    }
    if (!bookingData.checkIn || !bookingData.checkOut) {
      alert('Veuillez sélectionner les dates d\'arrivée et de départ.');
      return;
    }
    if (bookingData.checkOut <= bookingData.checkIn) {
      alert('La date de départ doit être après la date d\'arrivée.');
      return;
    }
    console.log('Réservation soumise:', { roomId: id, ...bookingData });
    alert('Réservation confirmée !');
    navigate('/');
  };

  if (!id) {
    // Affichage de la liste des chambres (page /booking)
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Nos Chambres</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roomsData.map(roomItem => (
            <div
              key={roomItem.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/booking/${roomItem.id}`)}
            >
              <img
                src={roomItem.image}
                alt={roomItem.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold">{roomItem.name}</h2>
              <p className="text-gray-600 mb-2">{roomItem.description}</p>
              <p className="text-blue-600 font-bold">{roomItem.price}FCFA / nuit</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Affichage du détail + réservation d'une chambre (page /booking/:id)

  if (!room) return <div className="text-center py-8">Chargement...</div>;

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
              {room.amenities.map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-blue-700">
              {room.price} € <span className="text-sm font-normal text-gray-600">/nuit</span>
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Réserver maintenant</h2>

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
                  <option key={num} value={num}>
                    {num} {num > 1 ? 'personnes' : 'personne'}
                  </option>
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
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
            >
              Confirmer la réservation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
