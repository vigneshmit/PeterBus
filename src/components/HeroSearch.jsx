import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRightLeft, 
  Calendar, 
  MapPin, 
  ArrowRight,
  X
} from 'lucide-react';
import { POPULAR_CITIES } from '../data/busData';

export default function HeroSearch({ 
  fromCity, 
  setFromCity, 
  toCity, 
  setToCity, 
  journeyDate, 
  setJourneyDate,
  tripType,
  setTripType,
  returnDate,
  setReturnDate,
  busTypeFilter,
  setBusTypeFilter,
  onSearch 
}) {
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [passengerCount, setPassengerCount] = useState(1);
  const [isSwapping, setIsSwapping] = useState(false);

  const fromRef = useRef(null);
  const toRef = useRef(null);

  // Close dropdowns when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (fromRef.current && !fromRef.current.contains(e.target)) {
        setShowFromSuggestions(false);
      }
      if (toRef.current && !toRef.current.contains(e.target)) {
        setShowToSuggestions(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowFromSuggestions(false);
        setShowToSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const filteredFromCities = POPULAR_CITIES.filter((city) =>
    !fromCity ||
    city.name.toLowerCase().includes(fromCity.toLowerCase()) ||
    city.code.toLowerCase().includes(fromCity.toLowerCase())
  );
  const fromList = filteredFromCities.length > 0 ? filteredFromCities : POPULAR_CITIES;

  const filteredToCities = POPULAR_CITIES.filter((city) =>
    !toCity ||
    city.name.toLowerCase().includes(toCity.toLowerCase()) ||
    city.code.toLowerCase().includes(toCity.toLowerCase())
  );
  const toList = filteredToCities.length > 0 ? filteredToCities : POPULAR_CITIES;

  const today = new Date().toISOString().split('T')[0];

  const handleSwap = (e) => {
    e.stopPropagation();
    setIsSwapping(true);
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
    setShowFromSuggestions(false);
    setShowToSuggestions(false);
    setTimeout(() => setIsSwapping(false), 200);
  };

  const handleQuickPick = (from, to) => {
    setFromCity(from);
    setToCity(to);
    setShowFromSuggestions(false);
    setShowToSuggestions(false);
    onSearch();
  };

  return (
    <section id="search" className="hero-section">
      <div className="container hero-container">
        {/* Hero Title & Subtitle */}
        <div className="hero-title-box">
          <h1 className="hero-main-title">
            Where will your next <br />
            <span className="hero-gradient-text">
              journey take you?
            </span>
          </h1>
          <p className="hero-subtitle-text">
            Smart intercity coach travel with real-time GPS tracking, verified AC sleeper buses, and zero cancellation fees.
          </p>
        </div>

        {/* Search Box */}
        <div className="search-card-wrapper">
          {/* Top Options Strip */}
          <div className="search-filter-strip">
            {/* Trip Type switcher */}
            <div style={{ display: 'flex', gap: '4px', background: '#f8fafc', padding: '3px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <button
                type="button"
                onClick={() => setTripType('oneway')}
                style={{
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 500,
                  backgroundColor: tripType === 'oneway' ? 'var(--midnight)' : 'transparent',
                  color: tripType === 'oneway' ? '#ffffff' : 'var(--text-muted)',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-heading)'
                }}
              >
                One Way
              </button>
              <button
                type="button"
                onClick={() => setTripType('round')}
                style={{
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 500,
                  backgroundColor: tripType === 'round' ? 'var(--midnight)' : 'transparent',
                  color: tripType === 'round' ? '#ffffff' : 'var(--text-muted)',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-heading)'
                }}
              >
                Round Trip <span style={{ fontSize: '10.5px', background: 'var(--brand-primary)', color: '#ffffff', padding: '1px 5px', borderRadius: '3px', marginLeft: '4px' }}>-15%</span>
              </button>
            </div>

            {/* Coach filter */}
            <div className="coach-filter-wrap">
              <span className="coach-filter-title">Coach:</span>
              {['All Buses', 'AC Sleeper', 'Volvo Multi-Axle'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setBusTypeFilter(type)}
                  style={{
                    fontSize: '12px',
                    fontWeight: 500,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    backgroundColor: busTypeFilter === type ? 'var(--brand-light)' : '#f8fafc',
                    color: busTypeFilter === type ? 'var(--brand-dark)' : 'var(--text-muted)',
                    border: busTypeFilter === type ? '1px solid var(--brand-border)' : '1px solid #e2e8f0',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-heading)'
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Segmented Inputs Bar */}
          <div className={tripType === 'round' ? 'search-fields-grid round-trip' : 'search-fields-grid'}>
            {/* FROM SEGMENT */}
            <div ref={fromRef} style={{ position: 'relative' }}>
              <div 
                className="search-field-item"
                onClick={() => {
                  setShowFromSuggestions(prev => !prev);
                  setShowToSuggestions(false);
                }}
                style={{ cursor: 'pointer' }}
              >
                <MapPin size={16} style={{ color: 'var(--brand-primary)', flexShrink: 0 }} />
                <div className="search-field-content">
                  <div className="search-field-label">From</div>
                  <input
                    type="text"
                    value={fromCity}
                    autoComplete="off"
                    onChange={(e) => {
                      setFromCity(e.target.value);
                      setShowFromSuggestions(true);
                      setShowToSuggestions(false);
                    }}
                    onFocus={() => {
                      setShowFromSuggestions(true);
                      setShowToSuggestions(false);
                    }}
                    placeholder="Departure city"
                    style={{
                      width: '100%',
                      border: 'none',
                      outline: 'none',
                      backgroundColor: 'transparent',
                      fontSize: '14.5px',
                      fontWeight: 600,
                      color: 'var(--midnight)',
                      fontFamily: 'var(--font-heading)'
                    }}
                  />
                </div>
                {fromCity && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFromCity('');
                      setShowFromSuggestions(true);
                    }}
                    style={{ padding: '2px', color: '#94a3b8', cursor: 'pointer', display: 'flex' }}
                    title="Clear"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              {/* Suggestions */}
              {showFromSuggestions && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 4px)',
                  left: 0,
                  width: '100%',
                  minWidth: '220px',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px rgba(15, 23, 42, 0.12)',
                  border: '1px solid #e2e8f0',
                  zIndex: 100,
                  maxHeight: '200px',
                  overflowY: 'auto',
                  padding: '4px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 8px', borderBottom: '1px solid #f1f5f9', marginBottom: '2px' }}>
                    <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>
                      Major Hubs
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowFromSuggestions(false);
                      }}
                      style={{ padding: '2px', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}
                      title="Close"
                    >
                      <X size={12} />
                    </button>
                  </div>
                  {fromList.map((city) => (
                    <div
                      key={city.code}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFromCity(city.name);
                        setShowFromSuggestions(false);
                      }}
                      style={{
                        padding: '6px 8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '13.5px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--brand-light)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <span style={{ fontWeight: 600, color: 'var(--midnight)' }}>{city.name}</span>
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>{city.code}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SWAP ICON BUTTON */}
            <div className="search-swap-col">
              <button
                type="button"
                onClick={handleSwap}
                title="Swap departure and destination"
                className="search-swap-btn"
                style={{ transform: isSwapping ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <ArrowRightLeft size={13} />
              </button>
            </div>

            {/* TO SEGMENT */}
            <div ref={toRef} style={{ position: 'relative' }}>
              <div 
                className="search-field-item"
                onClick={() => {
                  setShowToSuggestions(prev => !prev);
                  setShowFromSuggestions(false);
                }}
                style={{ cursor: 'pointer' }}
              >
                <MapPin size={16} style={{ color: '#2563eb', flexShrink: 0 }} />
                <div className="search-field-content">
                  <div className="search-field-label">To</div>
                  <input
                    type="text"
                    value={toCity}
                    autoComplete="off"
                    onChange={(e) => {
                      setToCity(e.target.value);
                      setShowToSuggestions(true);
                      setShowFromSuggestions(false);
                    }}
                    onFocus={() => {
                      setShowToSuggestions(true);
                      setShowFromSuggestions(false);
                    }}
                    placeholder="Destination city"
                    style={{
                      width: '100%',
                      border: 'none',
                      outline: 'none',
                      backgroundColor: 'transparent',
                      fontSize: '14.5px',
                      fontWeight: 600,
                      color: 'var(--midnight)',
                      fontFamily: 'var(--font-heading)'
                    }}
                  />
                </div>
                {toCity && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setToCity('');
                      setShowToSuggestions(true);
                    }}
                    style={{ padding: '2px', color: '#94a3b8', cursor: 'pointer', display: 'flex' }}
                    title="Clear"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              {/* Suggestions */}
              {showToSuggestions && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 4px)',
                  left: 0,
                  width: '100%',
                  minWidth: '220px',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px rgba(15, 23, 42, 0.12)',
                  border: '1px solid #e2e8f0',
                  zIndex: 100,
                  maxHeight: '200px',
                  overflowY: 'auto',
                  padding: '4px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 8px', borderBottom: '1px solid #f1f5f9', marginBottom: '2px' }}>
                    <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>
                      Popular Destinations
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowToSuggestions(false);
                      }}
                      style={{ padding: '2px', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}
                      title="Close"
                    >
                      <X size={12} />
                    </button>
                  </div>
                  {toList.map((city) => (
                    <div
                      key={city.code}
                      onClick={(e) => {
                        e.stopPropagation();
                        setToCity(city.name);
                        setShowToSuggestions(false);
                      }}
                      style={{
                        padding: '6px 8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '13.5px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--brand-light)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <span style={{ fontWeight: 600, color: 'var(--midnight)' }}>{city.name}</span>
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>{city.code}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* DEPARTURE DATE */}
            <div className="search-field-item">
              <Calendar size={16} style={{ color: '#d97706', flexShrink: 0 }} />
              <div className="search-field-content">
                <div className="search-field-label">Date</div>
                <input
                  type="date"
                  min={today}
                  value={journeyDate}
                  onChange={(e) => setJourneyDate(e.target.value)}
                  style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--midnight)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-heading)'
                  }}
                />
              </div>
            </div>

            {/* RETURN DATE (IF ROUND TRIP) */}
            {tripType === 'round' && (
              <div className="search-field-item">
                <Calendar size={16} style={{ color: '#4338ca', flexShrink: 0 }} />
                <div className="search-field-content">
                  <div className="search-field-label">Return</div>
                  <input
                    type="date"
                    min={journeyDate || today}
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    style={{
                      width: '100%',
                      border: 'none',
                      outline: 'none',
                      backgroundColor: 'transparent',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--midnight)',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-heading)'
                    }}
                  />
                </div>
              </div>
            )}

            {/* PASSENGERS STEPPER */}
            <div className="guest-stepper-box">
              <div>
                <div className="search-field-label">Guests</div>
                <div className="guest-stepper-value">
                  {passengerCount} {passengerCount === 1 ? 'Adult' : 'Adults'}
                </div>
              </div>
              <div className="guest-stepper-controls">
                <button
                  type="button"
                  onClick={() => setPassengerCount(Math.max(1, passengerCount - 1))}
                  className="stepper-btn"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => setPassengerCount(Math.min(6, passengerCount + 1))}
                  className="stepper-btn add"
                >
                  +
                </button>
              </div>
            </div>

            {/* Primary Button */}
            <div>
              <button
                type="button"
                onClick={onSearch}
                className="btn-primary search-submit-btn"
              >
                <span>Find Buses</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Quick Route Shortcuts */}
          <div className="trending-routes-strip">
            <span className="trending-label">Trending:</span>
            {[
              { from: 'Chennai', to: 'Bengaluru' },
              { from: 'Bengaluru', to: 'Coimbatore' },
              { from: 'Chennai', to: 'Madurai' },
              { from: 'Hyderabad', to: 'Bengaluru' }
            ].map((route, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickPick(route.from, route.to)}
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: 'var(--text-muted)',
                  backgroundColor: '#f1f5f9',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  fontFamily: 'var(--font-heading)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--brand-primary)';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f1f5f9';
                  e.currentTarget.style.color = 'var(--text-muted)';
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span>{route.from}</span>
                  <ArrowRight size={11} />
                  <span>{route.to}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
