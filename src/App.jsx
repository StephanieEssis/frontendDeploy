// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App















import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminRooms from './pages/Admin/Rooms';
import AdminBookings from './pages/Admin/Bookings';
import AdminUsers from './pages/Admin/Users';
import Booking from './pages/Booking/Booking';
import RoomBooking from './pages/Booking/RoomBooking';
import { AppProvider } from './context/AppContext';
import { useAppContext } from './hooks/useAppContext';
import './App.css';

const AppRoutes = () => {
  const { user } = useAppContext();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking/:id" element={<RoomBooking />} />
          
          {/* Routes Admin */}
          <Route 
            path="/admin" 
            element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />} 
          />
          <Route 
            path="/admin/rooms" 
            element={isAdmin ? <AdminRooms /> : <Navigate to="/" />} 
          />
          <Route 
            path="/admin/bookings" 
            element={isAdmin ? <AdminBookings /> : <Navigate to="/" />} 
          />
          <Route 
            path="/admin/users" 
            element={isAdmin ? <AdminUsers /> : <Navigate to="/" />} 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </Router>
  );
};

export default App;