// import { useNavigate } from 'react-router-dom';
// import React, { useState } from 'react';
// import SearchBar from '../../components/Search/SearchBar';
// import RoomList from '../../components/Room/RoomList';
// import StatsCard from '../../components/Stats/StatsCard';
// import BookingChart from '../../components/Stats/BookingChart';

// const Home = ({ isLoggedIn, onLogin }) => {
//   const navigate = useNavigate();
//   const [filteredRooms, setFilteredRooms] = useState([]);

//   const roomCategories = [
//     // ... conservez vos données de chambres existantes ...
//   ];

//   const handleSearch = (searchParams) => {
//     console.log('Paramètres de recherche:', searchParams);
    
//     // Filtrage basique des chambres (à adapter selon vos besoins)
//     const filtered = roomCategories.filter(room => {
//       // Ici vous pourriez ajouter la logique de filtrage par disponibilité
//       // en fonction des dates sélectionnées
//       return true; // Pour l'instant, retourne toutes les chambres
//     });
    
//     setFilteredRooms(filtered);
//   };

//   const handleBookingClick = () => {
//     if (isLoggedIn) {
//       navigate('/booking');
//     } else {
//       onLogin(); // Affiche le modal de connexion
//       // Vous pourriez aussi rediriger vers /login selon votre implémentation
//     }
//   };

//   // Utilise filteredRooms si des filtres sont appliqués, sinon toutes les chambres
//   const roomsToDisplay = filteredRooms.length > 0 ? filteredRooms : roomCategories;

//   return (
//     <>
//       {/* Hero Section - inchangée */}
//       <section className="relative h-[500px] overflow-hidden">
//         {/* ... contenu existant ... */}
//       </section>

//       {/* SearchBar - maintenant fonctionnelle */}
//       <SearchBar onSearch={handleSearch} />

//       {/* Room Categories - affiche les chambres filtrées */}
//       <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
//             Nos Catégories de Chambres
//           </h2>
//           <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
//             {filteredRooms.length > 0 
//               ? `Nous avons trouvé ${filteredRooms.length} chambres disponibles`
//               : 'Découvrez nos différentes catégories de chambres'}
//           </p>
//         </div>
//         <RoomList rooms={roomsToDisplay} />
//       </section>

//       {/* Statistics Section - inchangée */}
//       <section className="py-16 bg-gray-100">
//     <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
//               Statistiques de l'Hôtel
//             </h2>
//             <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
//               Découvrez quelques chiffres clés sur notre établissement et nos services.
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
//             <StatsCard icon="fa-door-open" value="120" label="Chambres au total" />
//             <StatsCard icon="fa-check-circle" value="85" label="Chambres disponibles" />
//             <StatsCard icon="fa-calendar-check" value="1,240" label="Réservations ce mois" />
//             <StatsCard icon="fa-users" value="5,680" label="Utilisateurs inscrits" />
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <BookingChart />
//       </section>
//     </>
//   );
// };

// export default Home;




import React from 'react';
import SearchBar from '../../components/Search/SearchBar';
import RoomList from '../../components/Room/RoomList';
import StatsCard from '../../components/Stats/StatsCard';
import BookingChart from '../../components/Stats/BookingChart';

const Home = ({ isLoggedIn, onLogin }) => {
  const roomCategories = [
    {
      id: 1,
      name: 'Chambre Standard',
      description: 'Confort essentiel pour un séjour agréable',
      price: 89,
      image: 'https://readdy.ai/api/search-image?query=A%20modern%20standard%20hotel%20room%20with%20a%20comfortable%20queen%20bed%2C%20clean%20white%20linens%2C%20minimalist%20decor%2C%20soft%20lighting%2C%20a%20small%20desk%20area%2C%20and%20a%20window%20with%20city%20views.%20The%20room%20has%20neutral%20colors%2C%20wooden%20accents%2C%20and%20appears%20spacious%20and%20inviting&width=600&height=400&seq=1&orientation=landscape'
    },
    {
      id: 2,
      name: 'Chambre Deluxe',
      description: 'Espace supplémentaire et commodités premium',
      price: 129,
      image: 'https://readdy.ai/api/search-image?query=A%20luxurious%20deluxe%20hotel%20room%20with%20a%20king-size%20bed%2C%20premium%20bedding%2C%20elegant%20furniture%2C%20rich%20color%20palette%20with%20gold%20accents%2C%20plush%20carpet%2C%20large%20windows%20with%20panoramic%20views%2C%20sophisticated%20lighting%20fixtures%2C%20and%20a%20spacious%20seating%20area%20with%20comfortable%20armchairs&width=600&height=400&seq=2&orientation=landscape'
    },
    {
      id: 3,
      name: 'Suite Junior',
      description: 'Séjour luxueux avec salon séparé',
      price: 189,
      image: 'https://readdy.ai/api/search-image?query=A%20spacious%20junior%20suite%20hotel%20room%20with%20separated%20living%20area%20and%20bedroom%20space%2C%20featuring%20a%20king%20bed%2C%20elegant%20sofa%20and%20coffee%20table%2C%20modern%20decor%20with%20tasteful%20artwork%2C%20large%20windows%20with%20city%20views%2C%20ambient%20lighting%2C%20and%20premium%20furnishings%20in%20neutral%20tones%20with%20subtle%20color%20accents&width=600&height=400&seq=3&orientation=landscape'
    },
    {
      id: 4,
      name: 'Suite Familiale',
      description: 'Idéal pour les familles avec enfants',
      price: 219,
      image: 'https://readdy.ai/api/search-image?query=A%20spacious%20family%20suite%20hotel%20room%20with%20two%20queen%20beds%20and%20a%20pullout%20sofa%2C%20bright%20and%20cheerful%20decor%2C%20colorful%20accents%2C%20child-friendly%20furnishings%2C%20a%20small%20dining%20area%2C%20large%20windows%20with%20views%2C%20and%20thoughtful%20amenities%20for%20families%20with%20children%20in%20a%20welcoming%20atmosphere&width=600&height=400&seq=4&orientation=landscape'
    }
  ];

  const handleSearch = (searchParams) => {
    console.log('Search parameters:', searchParams);
    // Ici vous ajouterez la logique de recherche
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=A%20luxurious%20hotel%20lobby%20with%20elegant%20modern%20design%2C%20featuring%20a%20grand%20reception%20desk%2C%20marble%20floors%2C%20stylish%20seating%20areas%2C%20sophisticated%20lighting%20fixtures%2C%20and%20large%20windows%20allowing%20natural%20light%20to%20illuminate%20the%20space.%20The%20atmosphere%20is%20welcoming%20yet%20upscale%20with%20a%20warm%20color%20palette&width=1440&height=500&seq=5&orientation=landscape"
            alt="Hotel Lobby"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-70"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-lg">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Votre séjour parfait commence ici
            </h1>
            <p className="mt-4 text-xl text-gray-200">
              Découvrez le confort et l'élégance dans nos chambres soigneusement conçues pour une expérience inoubliable.
            </p>
            <div className="mt-8">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300">
                Réserver maintenant
              </button>
            </div>
          </div>
        </div>
      </section>

      <SearchBar onSearch={handleSearch} />

      {/* Room Categories */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Nos Catégories de Chambres
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez nos différentes catégories de chambres conçues pour répondre à tous vos besoins et préférences.
          </p>
        </div>
        <RoomList rooms={roomCategories} />
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Statistiques de l'Hôtel
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez quelques chiffres clés sur notre établissement et nos services.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <StatsCard icon="fa-door-open" value="120" label="Chambres au total" />
            <StatsCard icon="fa-check-circle" value="85" label="Chambres disponibles" />
            <StatsCard icon="fa-calendar-check" value="1,240" label="Réservations ce mois" />
            <StatsCard icon="fa-users" value="5,680" label="Utilisateurs inscrits" />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <BookingChart />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;




