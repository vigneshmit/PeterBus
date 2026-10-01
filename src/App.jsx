import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSearch from './components/HeroSearch';
import BusResultsView from './components/BusResultsView';
import PromoOffers from './components/PromoOffers';
import PopularRoutes from './components/PopularRoutes';
import WhyPeterBus from './components/WhyPeterBus';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import BookingLookupModal from './components/BookingLookupModal';
import TicketSuccessModal from './components/TicketSuccessModal';
import LoginModal from './components/LoginModal';
import { Check } from 'lucide-react';

export default function App() {
  const today = new Date().toISOString().split('T')[0];

  // Search state
  const [fromCity, setFromCity] = useState('Chennai');
  const [toCity, setToCity] = useState('Bengaluru');
  const [journeyDate, setJourneyDate] = useState(today);
  const [tripType, setTripType] = useState('oneway');
  const [returnDate, setReturnDate] = useState('');
  const [busTypeFilter, setBusTypeFilter] = useState('All Buses');

  // Modals state
  const [isLookupOpen, setIsLookupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [lookupTab, setLookupTab] = useState('track');
  const [bookingSuccessData, setBookingSuccessData] = useState(null);
  const [pendingBooking, setPendingBooking] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // User Authentication state
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('peterbus_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRequireLogin = (bookingData) => {
    setPendingBooking(bookingData);
    setIsLoginOpen(true);
    showToast("Please sign in or create an account to book your ticket.");
  };

  const handleLoginSuccess = (userPayload) => {
    const user = typeof userPayload === 'string' 
      ? { name: userPayload, username: userPayload } 
      : userPayload;
    setCurrentUser(user);
    try {
      localStorage.setItem('peterbus_user', JSON.stringify(user));
    } catch (e) {
      console.warn("Storage quota warning", e);
    }
    showToast(`Welcome back, ${user.name || 'Traveler'}!`);

    // If booking was pending prior to sign-in, seamlessly complete it!
    if (pendingBooking) {
      setTimeout(() => {
        setBookingSuccessData({
          ...pendingBooking,
          passenger: user.name || user.username || 'Verified Passenger'
        });
        setPendingBooking(null);
        showToast("Booking confirmed! Your M-Ticket is generated.");
      }, 400);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('peterbus_user');
    } catch (e) {}
    showToast("Signed out successfully");
  };

  const handleSearchScroll = () => {
    const resultsElement = document.getElementById('bus-results');
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPopularRoute = (from, to) => {
    setFromCity(from);
    setToCity(to);
    handleSearchScroll();
    showToast(`Loaded routes for ${from} to ${to}`);
  };

  const handleOpenLookup = (tab = 'track') => {
    setLookupTab(tab);
    setIsLookupOpen(true);
  };

  const handleApplyPromo = (code) => {
    showToast(`Promo code "${code}" copied to clipboard!`);
  };

  const handleBookingSuccess = async (data) => {
    const pnrNumber = data.pnr || `PB-${Math.floor(100000 + Math.random() * 900000)}`;
    const bookingPayload = {
      ...data,
      pnr: pnrNumber,
      mobile: data.mobile || currentUser?.mobile || '9489442570',
      passenger: data.passenger || currentUser?.name || 'Vicky'
    };
    setBookingSuccessData(bookingPayload);

    // Automatic WhatsApp Dispatch to Customer Mobile
    try {
      const res = await fetch('http://localhost:5001/api/send-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload)
      });
      const result = await res.json();
      if (result.delivered) {
        showToast(`M-Ticket sent automatically to WhatsApp (+91 ${bookingPayload.mobile})!`);
      } else {
        showToast(`Ticket confirmed! WhatsApp notification dispatched.`);
      }
    } catch (err) {
      showToast(`Ticket confirmed for PNR: ${pnrNumber}`);
    }
  };

  return (
    <div className="peterbus-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#0f172a',
          color: '#FFFFFF',
          padding: '10px 16px',
          borderRadius: '8px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 999,
          fontSize: '13.5px',
          fontWeight: 500,
          border: '1px solid #1e293b',
          animation: 'fadeIn 0.2s ease',
          fontFamily: 'var(--font-heading)'
        }}>
          <Check size={16} style={{ color: 'var(--brand-primary)' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar 
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenLookup={handleOpenLookup} 
        onOpenHelp={() => showToast("Support helpline: 1800-420-PETER (24x7)")} 
        onOpenLogin={() => setIsLoginOpen(true)}
      />

      <main style={{ flex: 1 }}>
        {/* Hero Section & Floating Search Pill */}
        <HeroSearch 
          fromCity={fromCity}
          setFromCity={setFromCity}
          toCity={toCity}
          setToCity={setToCity}
          journeyDate={journeyDate}
          setJourneyDate={setJourneyDate}
          tripType={tripType}
          setTripType={setTripType}
          returnDate={returnDate}
          setReturnDate={setReturnDate}
          busTypeFilter={busTypeFilter}
          setBusTypeFilter={setBusTypeFilter}
          onSearch={handleSearchScroll}
        />

        {/* Visual Destination Photography Cards */}
        <PopularRoutes onSelectRoute={handleSelectPopularRoute} />

        {/* Live Matching Buses & Interactive Deck Cabin */}
        <BusResultsView 
          currentUser={currentUser}
          onRequireLogin={handleRequireLogin}
          fromCity={fromCity}
          toCity={toCity}
          journeyDate={journeyDate}
          busTypeFilter={busTypeFilter}
          onBookingSuccess={handleBookingSuccess}
        />

        {/* 2026 Modern Bento Grid (Radar Telemetry, Refunds, Safety, Punctuality) */}
        <WhyPeterBus />

        {/* Special Coupons & Travel Passes */}
        <PromoOffers onApplyPromo={handleApplyPromo} />

        {/* Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* Clean Modern Footer */}
      <Footer />

      {/* Live Bus Tracking / Manage Booking Modal */}
      <BookingLookupModal 
        isOpen={isLookupOpen} 
        onClose={() => setIsLookupOpen(false)} 
        initialTab={lookupTab}
      />

      {/* Digital M-Ticket Success Modal */}
      <TicketSuccessModal 
        bookingData={bookingSuccessData} 
        onClose={() => setBookingSuccessData(null)} 
      />

      {/* Editorial Luxury Bus Login Modal (Blur & Split Layout) */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
