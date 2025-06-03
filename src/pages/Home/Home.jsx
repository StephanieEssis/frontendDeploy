import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import SearchBar from '../../components/Search/SearchBar';
import RoomList from '../../components/Room/RoomList';
import StatsCard from '../../components/Stats/StatsCard';
import BookingChart from '../../components/Stats/BookingChart';

const Home = ({ isLoggedIn, onLogin }) => {
  const navigate = useNavigate();
  const [filteredRooms, setFilteredRooms] = useState([]);

  const roomCategories = [
    // ... conservez vos données de chambres existantes ...
  ];

  const handleSearch = (searchParams) => {
    console.log('Paramètres de recherche:', searchParams);
    
    // Filtrage basique des chambres (à adapter selon vos besoins)
    const filtered = roomCategories.filter(room => {
      // Ici vous pourriez ajouter la logique de filtrage par disponibilité
      // en fonction des dates sélectionnées
      return true; // Pour l'instant, retourne toutes les chambres
    });
    
    setFilteredRooms(filtered);
  };

  const handleBookingClick = () => {
    if (isLoggedIn) {
      navigate('/booking');
    } else {
      onLogin(); // Affiche le modal de connexion
      // Vous pourriez aussi rediriger vers /login selon votre implémentation
    }
  };

  // Utilise filteredRooms si des filtres sont appliqués, sinon toutes les chambres
  const roomsToDisplay = filteredRooms.length > 0 ? filteredRooms : roomCategories;

  return (
    <>
      {/* Hero Section - inchangée */}
      <section className="relative h-[500px] overflow-hidden">
        {/* ... contenu existant ... */}
      </section>

      {/* SearchBar - maintenant fonctionnelle */}
      <SearchBar onSearch={handleSearch} />

      {/* Room Categories - affiche les chambres filtrées */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Nos Catégories de Chambres
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {filteredRooms.length > 0 
              ? `Nous avons trouvé ${filteredRooms.length} chambres disponibles`
              : 'Découvrez nos différentes catégories de chambres'}
          </p>
        </div>
        <RoomList rooms={roomsToDisplay} />
      </section>

      {/* Statistics Section - inchangée */}
      <section className="py-16 bg-gray-100">
        {/* ... contenu existant ... */}
      </section>
    </>
  );
};

export default Home;