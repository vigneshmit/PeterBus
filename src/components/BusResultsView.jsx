import React, { useState } from 'react';
import { 
  Star, 
  Check, 
  ShieldCheck, 
  ChevronRight,
  SlidersHorizontal,
  Compass,
  Bus
} from 'lucide-react';
import { MOCK_BUS_RESULTS } from '../data/busData';

export default function BusResultsView({ 
  currentUser,
  onRequireLogin,
  fromCity, 
  toCity, 
  journeyDate, 
  busTypeFilter,
  onBookingSuccess 
}) {
  const [selectedBusId, setSelectedBusId] = useState(null);
  const [activeDeck, setActiveDeck] = useState('lower');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedBoarding, setSelectedBoarding] = useState('Kilambakkam (KCBT) - 21:30');
  const [selectedDropping, setSelectedDropping] = useState('Madiwala - 05:15');
  const [activeSort, setActiveSort] = useState('recommended');

  const lowerDeckSeats = [
    { id: 'L1', type: 'single', status: 'available', price: 899, isLadies: false },
    { id: 'L2', type: 'double', status: 'booked', price: 849, isLadies: false },
    { id: 'L3', type: 'double', status: 'booked', price: 849, isLadies: false },
    { id: 'L4', type: 'single', status: 'available', price: 899, isLadies: true },
    { id: 'L5', type: 'double', status: 'available', price: 849, isLadies: false },
    { id: 'L6', type: 'double', status: 'available', price: 849, isLadies: false },
    { id: 'L7', type: 'single', status: 'booked', price: 899, isLadies: false },
    { id: 'L8', type: 'double', status: 'available', price: 849, isLadies: false },
    { id: 'L9', type: 'double', status: 'available', price: 849, isLadies: false },
    { id: 'L10', type: 'single', status: 'available', price: 899, isLadies: false },
    { id: 'L11', type: 'double', status: 'booked', price: 849, isLadies: false },
    { id: 'L12', type: 'double', status: 'available', price: 849, isLadies: false },
  ];

  const upperDeckSeats = [
    { id: 'U1', type: 'single', status: 'available', price: 949, isLadies: false },
    { id: 'U2', type: 'double', status: 'available', price: 899, isLadies: false },
    { id: 'U3', type: 'double', status: 'available', price: 899, isLadies: false },
    { id: 'U4', type: 'single', status: 'available', price: 949, isLadies: true },
    { id: 'U5', type: 'double', status: 'booked', price: 899, isLadies: true },
    { id: 'U6', type: 'double', status: 'booked', price: 899, isLadies: false },
    { id: 'U7', type: 'single', status: 'booked', price: 949, isLadies: false },
    { id: 'U8', type: 'double', status: 'available', price: 899, isLadies: false },
    { id: 'U9', type: 'double', status: 'available', price: 899, isLadies: false },
    { id: 'U10', type: 'single', status: 'available', price: 949, isLadies: false },
    { id: 'U11', type: 'double', status: 'available', price: 899, isLadies: false },
    { id: 'U12', type: 'double', status: 'available', price: 899, isLadies: false },
  ];

  const toggleSeat = (seat) => {
    if (seat.status === 'booked') return;
    if (selectedSeats.find(s => s.id === seat.id)) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      if (selectedSeats.length >= 6) {
        alert("Maximum 6 seats per booking.");
        return;
      }
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleSelectSeatsClick = (busId) => {
    if (selectedBusId === busId) {
      setSelectedBusId(null);
      setSelectedSeats([]);
    } else {
      setSelectedBusId(busId);
      setSelectedSeats([]);
    }
  };

  const currentBus = MOCK_BUS_RESULTS.find(b => b.id === selectedBusId);
  const totalAmount = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <section id="bus-results" className="results-section">
      <div className="container">
        {/* Results Header */}
        <div className="results-header-row">
          <div>
            <div className="results-badge-wrap">
              <span style={{
                backgroundColor: 'var(--midnight)',
                color: 'var(--brand-primary)',
                fontSize: '11px',
                fontWeight: 600,
                padding: '2px 7px',
                borderRadius: '4px',
                fontFamily: 'var(--font-heading)'
              }}>
                DIRECT CORRIDOR
              </span>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                {MOCK_BUS_RESULTS.length} verified operators available
              </span>
            </div>
            <h2 className="results-title-heading">
              Buses from <span className="results-title-accent">{fromCity || 'Chennai'}</span> to <span>{toCity || 'Bengaluru'}</span>
            </h2>
            <p className="results-meta-date">
              Travel Date: <span style={{ color: 'var(--midnight)', fontWeight: 500 }}>{journeyDate || 'Today'}</span> • GPS-tracked & Sanitized
            </p>
          </div>

          {/* Sort Tabs */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: '#ffffff',
            padding: '3px',
            borderRadius: '8px',
            border: '1px solid var(--border-light)'
          }}>
            <span style={{ fontSize: '12.5px', fontWeight: 500, color: 'var(--text-muted)', paddingLeft: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <SlidersHorizontal size={12} /> Sort:
            </span>
            {[
              { id: 'recommended', label: 'Fastest' },
              { id: 'cheapest', label: 'Cheapest' },
              { id: 'earliest', label: 'Departure' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSort(tab.id)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '12.5px',
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: activeSort === tab.id ? 'var(--midnight)' : 'transparent',
                  color: activeSort === tab.id ? 'var(--brand-primary)' : 'var(--text-muted)',
                  fontFamily: 'var(--font-heading)'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bus List Items */}
        <div className="bus-cards-list">
          {MOCK_BUS_RESULTS.map((bus) => {
            const isExpanded = selectedBusId === bus.id;

            return (
              <div 
                key={bus.id}
                className={isExpanded ? 'bus-card-item expanded' : 'bus-card-item'}
              >
                {/* Main Bus Header / Info Row */}
                <div className="bus-card-main-pad">
                  <div className="bus-card-row-grid">
                    
                    {/* Operator & Bus Type */}
                    <div className="bus-operator-block">
                      <div className="bus-operator-header">
                        <span className="bus-operator-name">
                          {bus.operator}
                        </span>
                        {bus.isLiveTracking && (
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            backgroundColor: 'var(--brand-light)',
                            color: 'var(--brand-dark)',
                            fontSize: '11px',
                            fontWeight: 500,
                            padding: '1px 6px',
                            borderRadius: '999px',
                            fontFamily: 'var(--font-heading)'
                          }}>
                            <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--brand-primary)', display: 'inline-block' }} />
                            Live GPS
                          </span>
                        )}
                      </div>

                      <div className="bus-type-desc">
                        {bus.busType}
                      </div>

                      <div className="bus-rating-row">
                        <div className="bus-rating-pill">
                          <Star size={11} fill="var(--brand-primary)" />
                          <span>{bus.rating}</span>
                        </div>
                        <span className="bus-reviews-text">
                          ({bus.reviewCount} ratings)
                        </span>
                      </div>
                    </div>

                    {/* Departure, Duration, Arrival */}
                    <div className="bus-timing-strip">
                      {/* Departure */}
                      <div>
                        <div className="bus-time-display">
                          {bus.departureTime}
                        </div>
                        <div className="bus-station-name">
                          {bus.departurePlace}
                        </div>
                        <div className="bus-city-name">{fromCity || 'Chennai'}</div>
                      </div>

                      {/* Travel Duration line */}
                      <div className="bus-duration-indicator">
                        <span className="bus-duration-label">
                          {bus.duration}
                        </span>
                        <div className="bus-duration-track">
                          <div className="bus-duration-dot" />
                        </div>
                        <span className="bus-nonstop-label">
                          Non-Stop
                        </span>
                      </div>

                      {/* Arrival */}
                      <div style={{ textAlign: 'right' }}>
                        <div className="bus-time-display">
                          {bus.arrivalTime}
                        </div>
                        <div className="bus-station-name">
                          {bus.arrivalPlace}
                        </div>
                        <div className="bus-city-name">{toCity || 'Bengaluru'}</div>
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="bus-fare-cta-block">
                      <div>
                        <span className="bus-old-fare">
                          ₹{bus.originalPrice}
                        </span>
                        <span className="bus-main-fare">
                          ₹{bus.price}
                        </span>
                      </div>

                      <div className="bus-seats-warning">
                        {bus.seatsAvailable} Berths Available
                      </div>

                      {/* Select Seats Button */}
                      <button
                        onClick={() => handleSelectSeatsClick(bus.id)}
                        className={isExpanded ? 'btn-ghost' : 'btn-primary'}
                        style={{
                          height: '34px',
                          padding: '0 16px',
                          fontSize: '13px',
                          fontWeight: 500,
                          width: '100%',
                          maxWidth: '130px'
                        }}
                      >
                        {isExpanded ? 'Hide Seats' : 'Select Seats'}
                        <ChevronRight size={13} style={{ transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s', marginLeft: '2px' }} />
                      </button>
                    </div>
                  </div>

                  {/* Amenities Strip */}
                  <div className="bus-amenities-row">
                    <div className="bus-amenities-tags">
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>Included:</span>
                      {bus.amenities.slice(0, 5).map((item, idx) => (
                        <span key={idx} style={{
                          fontSize: '11.5px',
                          backgroundColor: '#f8fafc',
                          color: '#475569',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          border: '1px solid var(--border-light)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}>
                          <Check size={10} style={{ color: 'var(--brand-primary)' }} />
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="bus-cancellation-policy">
                      <ShieldCheck size={13} />
                      {bus.cancellationPolicy}
                    </div>
                  </div>
                </div>

                {/* EXPANDABLE SEAT LAYOUT DRAWER */}
                {isExpanded && (
                  <div className="seat-drawer-wrapper">
                    <div className="seat-drawer-grid">

                      {/* Left: Cabin Deck & Seat Matrix */}
                      <div>
                        {/* Deck Switcher Tabs */}
                        <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
                          <button
                            onClick={() => setActiveDeck('lower')}
                            style={{
                              padding: '5px 12px',
                              borderRadius: '6px',
                              fontSize: '12.5px',
                              fontWeight: 500,
                              cursor: 'pointer',
                              backgroundColor: activeDeck === 'lower' ? 'var(--midnight)' : '#ffffff',
                              color: activeDeck === 'lower' ? 'var(--brand-primary)' : 'var(--text-muted)',
                              border: activeDeck === 'lower' ? '1px solid var(--midnight)' : '1px solid var(--border-light)',
                              fontFamily: 'var(--font-heading)'
                            }}
                          >
                            Lower Deck (Seats & Sleepers)
                          </button>
                          <button
                            onClick={() => setActiveDeck('upper')}
                            style={{
                              padding: '5px 12px',
                              borderRadius: '6px',
                              fontSize: '12.5px',
                              fontWeight: 500,
                              cursor: 'pointer',
                              backgroundColor: activeDeck === 'upper' ? 'var(--midnight)' : '#ffffff',
                              color: activeDeck === 'upper' ? 'var(--brand-primary)' : 'var(--text-muted)',
                              border: activeDeck === 'upper' ? '1px solid var(--midnight)' : '1px solid var(--border-light)',
                              fontFamily: 'var(--font-heading)'
                            }}
                          >
                            Upper Deck (Club Sleepers)
                          </button>
                        </div>

                        {/* Legend */}
                        <div className="seat-legend-row">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <div style={{ width: '13px', height: '13px', borderRadius: '3px', border: '1px solid #cbd5e1', backgroundColor: '#FFFFFF' }} />
                            <span>Available</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <div style={{ width: '13px', height: '13px', borderRadius: '3px', backgroundColor: 'var(--brand-primary)' }} />
                            <span style={{ fontWeight: 600, color: 'var(--brand-primary)' }}>Selected</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <div style={{ width: '13px', height: '13px', borderRadius: '3px', backgroundColor: 'var(--border-light)' }} />
                            <span>Booked</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <div style={{ width: '13px', height: '13px', borderRadius: '3px', border: '1px solid #f472b6', backgroundColor: '#fdf2f8' }} />
                            <span style={{ color: '#db2777' }}>Ladies</span>
                          </div>
                        </div>

                        {/* Coach Cabin Box */}
                        <div className="cabin-box">
                          {/* Driver Steering wheel */}
                          <div className="cabin-driver-bar">
                            <span className="cabin-driver-text">
                              <span>Driver Cabin</span>
                              <Compass size={13} style={{ color: 'var(--brand-primary)' }} />
                            </span>
                          </div>

                          {/* Matrix */}
                          <div className="seats-matrix-grid">
                            {(activeDeck === 'lower' ? lowerDeckSeats : upperDeckSeats).map((seat) => {
                              const isSelected = selectedSeats.some(s => s.id === seat.id);
                              const isBooked = seat.status === 'booked';

                              let seatClass = 'seat-cell-btn available';
                              if (isBooked) seatClass = 'seat-cell-btn booked';
                              else if (isSelected) seatClass = 'seat-cell-btn selected';
                              else if (seat.isLadies) seatClass = 'seat-cell-btn ladies';

                              return (
                                <button
                                  key={seat.id}
                                  type="button"
                                  disabled={isBooked}
                                  onClick={() => toggleSeat(seat)}
                                  className={seatClass}
                                  title={isBooked ? 'Already Reserved' : `Berth ${seat.id} • ₹${seat.price}`}
                                >
                                  <span className="seat-cell-id">{seat.id}</span>
                                  <span className="seat-cell-price">₹{seat.price}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Right: Boarding / Dropping & Fare Breakdown */}
                      <div className="boarding-drop-column">
                        <div>
                          <h4 className="boarding-title">
                            Boarding & Dropping Points
                          </h4>

                          {/* Boarding Point */}
                          <div style={{ marginBottom: '10px' }}>
                            <label className="input-label-small">
                              Boarding Point ({fromCity || 'Chennai'})
                            </label>
                            <select
                              value={selectedBoarding}
                              onChange={(e) => setSelectedBoarding(e.target.value)}
                              style={{
                                width: '100%',
                                padding: '7px 10px',
                                borderRadius: '6px',
                                border: '1px solid #cbd5e1',
                                fontSize: '13px',
                                fontWeight: 500,
                                color: 'var(--midnight)',
                                outline: 'none',
                                backgroundColor: '#ffffff'
                              }}
                            >
                              <option value="Kilambakkam (KCBT) - 21:30">Kilambakkam (KCBT) - 21:30</option>
                              <option value="Koyambedu (CMBT) - 20:45">Koyambedu (CMBT) - 20:45</option>
                              <option value="Guindy Kathipara - 21:10">Guindy Kathipara - 21:10</option>
                              <option value="Perungalathur - 21:45">Perungalathur - 21:45</option>
                            </select>
                          </div>

                          {/* Dropping Point */}
                          <div style={{ marginBottom: '14px' }}>
                            <label className="input-label-small">
                              Dropping Point ({toCity || 'Bengaluru'})
                            </label>
                            <select
                              value={selectedDropping}
                              onChange={(e) => setSelectedDropping(e.target.value)}
                              style={{
                                width: '100%',
                                padding: '7px 10px',
                                borderRadius: '6px',
                                border: '1px solid #cbd5e1',
                                fontSize: '13px',
                                fontWeight: 500,
                                color: 'var(--midnight)',
                                outline: 'none',
                                backgroundColor: '#ffffff'
                              }}
                            >
                              <option value="Madiwala - 05:15">Madiwala - 05:15</option>
                              <option value="Silk Board - 05:30">Silk Board - 05:30</option>
                              <option value="Electronic City - 05:00">Electronic City - 05:00</option>
                              <option value="Majestic (KSRTC) - 06:00">Majestic (KSRTC) - 06:00</option>
                            </select>
                          </div>

                          {/* Fare Breakdown */}
                          <div className="fare-breakdown-card">
                            <div className="fare-row">
                              <span>Seats:</span>
                              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--brand-dark)' }}>
                                {selectedSeats.length > 0 ? selectedSeats.map(s => s.id).join(', ') : 'None'}
                              </span>
                            </div>
                            <div className="fare-row">
                              <span>Base Fare:</span>
                              <span className="fare-row-val">
                                ₹{totalAmount}
                              </span>
                            </div>
                            <div className="fare-total-row">
                              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--midnight)' }}>Total:</span>
                              <span style={{ fontSize: '17px', fontWeight: 600, color: 'var(--midnight)', fontFamily: 'var(--font-heading)' }}>
                                ₹{totalAmount}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Confirm Button with Sign-In Verification */}
                        <button
                          type="button"
                          disabled={selectedSeats.length === 0}
                          onClick={() => {
                            if (selectedSeats.length === 0) return;
                            const bookingPayload = {
                              bus: currentBus,
                              seats: selectedSeats,
                              boarding: selectedBoarding,
                              dropping: selectedDropping,
                              total: totalAmount
                            };

                            // Check if user is signed in before booking
                            if (!currentUser) {
                              if (onRequireLogin) {
                                onRequireLogin(bookingPayload);
                              }
                              return;
                            }

                            // If already signed in, confirm booking
                            onBookingSuccess({
                              ...bookingPayload,
                              passenger: currentUser.name || currentUser.username || 'Passenger'
                            });
                          }}
                          className="btn-primary"
                          style={{
                            width: '100%',
                            height: '40px',
                            fontSize: '14px',
                            fontWeight: 600,
                            borderRadius: '8px',
                            opacity: selectedSeats.length === 0 ? 0.5 : 1,
                            cursor: selectedSeats.length === 0 ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                          }}
                        >
                          {selectedSeats.length > 0 
                            ? (currentUser 
                                ? `Confirm ${selectedSeats.length} Seat(s) • ₹${totalAmount}` 
                                : `Sign In & Book ${selectedSeats.length} Seat(s) • ₹${totalAmount}`) 
                            : 'Select a Berth to Book'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
