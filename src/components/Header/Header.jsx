// import React from 'react';
// import { Link } from 'react-router-dom';
// import LoginModal from '../Auth/LoginModal';
// import RegisterModal from '../Auth/RegisterModal';

// const Header = ({ isLoggedIn, isAdmin, onLogout }) => {
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [showRegisterModal, setShowRegisterModal] = useState(false);

//   return (
//     <header className="bg-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center">
//             <Link to="/" className="flex-shrink-0">
//               <h1 className="text-2xl font-bold text-blue-600">
//                 <i className="fas fa-hotel mr-2"></i>
//                 Hotel Booking Manager
//               </h1>
//             </Link>
//             <nav className="ml-10 flex items-center space-x-4">
//               <Link to="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
//                 Accueil
//               </Link>
//               <Link to="/booking" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
//                 Chambres
//               </Link>
//               <a href="#" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
//                 Services
//               </a>
//               <a href="#" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
//                 Contact
//               </a>
//               {isAdmin && (
//                 <Link to="/admin" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
//                   Admin
//                 </Link>
//               )}
//             </nav>
//           </div>
//           <div className="flex items-center">
//             {isLoggedIn ? (
//               <div className="flex items-center space-x-4">
//                 <button onClick={onLogout} className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium">
//                   <i className="fas fa-sign-out-alt mr-1"></i> Déconnexion
//                 </button>
//               </div>
//             ) : (
//               <div className="flex items-center space-x-4">
//                 <button
//                   onClick={() => setShowLoginModal(true)}
//                   className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium"
//                 >
//                   <i className="fas fa-sign-in-alt mr-1"></i> Connexion
//                 </button>
//                 <button
//                   onClick={() => setShowRegisterModal(true)}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
//                 >
//                   <i className="fas fa-user-plus mr-1"></i> Inscription
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Modals */}
//       {showLoginModal && (
//         <LoginModal 
//           onClose={() => setShowLoginModal(false)} 
//           onLoginSuccess={onLogin}
//           showRegister={() => {
//             setShowLoginModal(false);
//             setShowRegisterModal(true);
//           }}
//         />
//       )}
//       {showRegisterModal && (
//         <RegisterModal 
//           onClose={() => setShowRegisterModal(false)} 
//           showLogin={() => {
//             setShowRegisterModal(false);
//             setShowLoginModal(true);
//           }}
//         />
//       )}
//     </header>
//   );
// };

// export default Header;





// import React, { useState } from 'react'; // Ajoutez l'import de useState
// import { Link } from 'react-router-dom';
// import LoginModal from '../Auth/LoginModal';
// import RegisterModal from '../Auth/RegisterModal';

// const Header = ({ isLoggedIn, isAdmin, onLogout, onLogin }) => { // Ajoutez onLogin dans les props
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [showRegisterModal, setShowRegisterModal] = useState(false);

//   return (
//     <header className="bg-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center">
//             <Link to="/" className="flex-shrink-0">
//               <h1 className="text-2xl font-bold text-blue-600">
//                 <i className="fas fa-hotel mr-2"></i>
//                 Hotel Booking Manager
//               </h1>
//             </Link>
//             <nav className="ml-10 flex items-center space-x-4">
//               <Link to="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
//                 Accueil
//               </Link>
//               <Link to="/booking" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
//                 Chambres
//               </Link>
//               <a href="#" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
//                 Services
//               </a>
//               <a href="#" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
//                 Contact
//               </a>
//               {isAdmin && (
//                 <Link to="/admin" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
//                   Admin
//                 </Link>
//               )}
//             </nav>
//           </div>
//           <div className="flex items-center">
//             {isLoggedIn ? (
//               <div className="flex items-center space-x-4">
//                 <button onClick={onLogout} className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium">
//                   <i className="fas fa-sign-out-alt mr-1"></i> Déconnexion
//                 </button>
//               </div>
//             ) : (
//               <div className="flex items-center space-x-4">
//                 <button
//                   onClick={() => setShowLoginModal(true)}
//                   className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium"
//                 >
//                   <i className="fas fa-sign-in-alt mr-1"></i> Connexion
//                 </button>
//                 <button
//                   onClick={() => setShowRegisterModal(true)}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
//                 >
//                   <i className="fas fa-user-plus mr-1"></i> Inscription
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Modals */}
//       {showLoginModal && (
//         <LoginModal 
//           onClose={() => setShowLoginModal(false)} 
//           onLoginSuccess={onLogin} // Utilisation correcte de onLogin
//           showRegister={() => {
//             setShowLoginModal(false);
//             setShowRegisterModal(true);
//           }}
//         />
//       )}
//       {showRegisterModal && (
//         <RegisterModal 
//           onClose={() => setShowRegisterModal(false)} 
//           showLogin={() => {
//             setShowRegisterModal(false);
//             setShowLoginModal(true);
//           }}
//         />
//       )}
//     </header>
//   );
// };

// export default Header;    





import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from '../Auth/LoginModal';
import RegisterModal from '../Auth/RegisterModal';

const Header = ({ isLoggedIn, isAdmin, onLogout, onLogin }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <>
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">
                  <i className="fas fa-hotel mr-2"></i>
                  Hotel Mylan Lodge
                </h1>
              </Link>
              <nav className="ml-10 flex items-center space-x-4">
                <Link to="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Accueil
                </Link>
                <Link to="/booking" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Chambres
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                    Admin
                  </Link>
                )}
              </nav>
            </div>
            <div className="flex items-center">
              {isLoggedIn ? (
                <button onClick={onLogout} className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium">
                  <i className="fas fa-sign-out-alt mr-1"></i> Déconnexion
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <i className="fas fa-sign-in-alt mr-1"></i> Connexion
                  </button>
                  <button
                    onClick={() => setShowRegisterModal(true)}
                    className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    <i className="fas fa-user-plus mr-1"></i> Inscription
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Modals */}
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={onLogin}
          showRegister={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }}
        />
      )}
      {showRegisterModal && (
        <RegisterModal 
          onClose={() => setShowRegisterModal(false)}
          showLogin={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </>
  );
};

export default Header;