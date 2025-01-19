import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

import EventPage from './pages/EventPage';
import CreateEvent from './pages/CreateEvent';
import EditEvent from './pages/EditEvent';
import DeleteEvent from './pages/DeleteEvent';

import UpcomingEvents from './pages/UpcomingEvent';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          {/* Navbar */}
          <Navbar />
          <div className="flex-grow">
            <Routes>
              {/* Home & Authentication */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Event Management Routes */}
              <Route path="/events" element={<EventPage />} />
              <Route path="/events/create" element={<CreateEvent />} />
              <Route path="/events/updateevent/:id" element={<EditEvent />} />
              <Route path="/events/delete/:id" element={<DeleteEvent />} />

              <Route path="/events/upcoming" element={<UpcomingEvents />} />
            </Routes>
          </div>
          {/* Footer */}
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
