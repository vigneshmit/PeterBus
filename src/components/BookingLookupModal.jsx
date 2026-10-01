import React, { useState } from 'react';
import { MapPin, Clock, Phone, Search, X, Ticket, Navigation } from 'lucide-react';

export default function BookingLookupModal({ isOpen, onClose, initialTab = 'track' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [pnrNumber, setPnrNumber] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleLookup = (e) => {
    e?.preventDefault();
    setHasSearched(true);
    setSearchResult({
      pnr: pnrNumber || 'PB-849204',
      operator: 'Peter Express Club Class (Volvo 9600 A/C Sleeper)',
      busNumber: 'TN 01 BV 4488',
      driverName: 'Murugan S.',
      driverPhone: '+91 94444 12345',
      route: 'Chennai (Kilambakkam KCBT) to Bengaluru (Madiwala)',
      departure: '21:30 (Departed on time)',
      currentLocation: 'Tindivanam Toll Plaza (NH 45) • Speed: 68 km/h',
      nextStop: 'Villupuram Bypass (Est: 23:15)',
      estimatedArrival: 'Tomorrow 05:15 AM (On Schedule)',
      status: 'On Highway • Live GPS Active',
      passengerName: 'Vicky / Karthik',
      seat: 'U4 (Upper Sleeper)'
    });
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.7)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '16px'
    }} onClick={onClose}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '500px',
        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.35)',
        overflow: 'hidden',
        border: '1px solid var(--border-light)',
        animation: 'fadeIn 0.2s ease'
      }} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-light)',
          backgroundColor: 'var(--midnight)',
          color: '#ffffff'
        }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', margin: 0, fontFamily: 'var(--font-heading)' }}>
              {activeTab === 'track' ? 'Live Bus Radar (GPS Telemetry)' : 'Manage / Cancel Booking'}
            </h3>
            <p style={{ fontSize: '12.5px', color: '#94a3b8', margin: '2px 0 0' }}>
              Enter your PNR or registered mobile number
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              cursor: 'pointer'
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Tab switch */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-light)',
          backgroundColor: '#f8fafc'
        }}>
          <button
            type="button"
            onClick={() => { setActiveTab('track'); setHasSearched(false); }}
            style={{
              flex: 1,
              padding: '10px',
              fontSize: '13.5px',
              fontWeight: 600,
              border: 'none',
              backgroundColor: activeTab === 'track' ? '#ffffff' : 'transparent',
              color: activeTab === 'track' ? 'var(--brand-primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'track' ? '2px solid var(--brand-primary)' : 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-heading)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Navigation size={14} />
            <span>Live Bus GPS Radar</span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('ticket'); setHasSearched(false); }}
            style={{
              flex: 1,
              padding: '10px',
              fontSize: '13.5px',
              fontWeight: 600,
              border: 'none',
              backgroundColor: activeTab === 'ticket' ? '#ffffff' : 'transparent',
              color: activeTab === 'ticket' ? 'var(--brand-primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'ticket' ? '2px solid var(--brand-primary)' : 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-heading)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Ticket size={14} />
            <span>View Ticket & Invoice</span>
          </button>
        </div>

        {/* Modal Body Form */}
        <div style={{ padding: '18px 20px' }}>
          <form onSubmit={handleLookup} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flex: 1,
              backgroundColor: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '0 12px'
            }}>
              <Search size={15} style={{ color: '#94a3b8', marginRight: '6px' }} />
              <input
                type="text"
                placeholder="e.g. PB-849204 or Mobile"
                value={pnrNumber}
                onChange={(e) => setPnrNumber(e.target.value)}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  padding: '8px 0',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--midnight)'
                }}
              />
            </div>
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '0 16px', height: '36px', fontSize: '13.5px' }}
            >
              Track Bus
            </button>
          </form>

          {/* Quick sample shortcut */}
          {!hasSearched && (
            <div style={{
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              padding: '14px',
              border: '1px solid var(--border-light)',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                Test with a live simulated trip:
              </p>
              <button
                type="button"
                onClick={() => {
                  setPnrNumber('PB-849204');
                  handleLookup();
                }}
                style={{
                  fontSize: '12.5px',
                  fontWeight: 500,
                  color: 'var(--brand-dark)',
                  backgroundColor: 'var(--brand-light)',
                  padding: '5px 14px',
                  borderRadius: '6px',
                  border: '1px solid var(--brand-border)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-heading)'
                }}
              >
                Load Live Demo Trip: PB-849204
              </button>
            </div>
          )}

          {/* Live Search Result View */}
          {hasSearched && searchResult && (
            <div style={{
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid var(--border-light)',
              padding: '16px',
              animation: 'fadeIn 0.2s ease'
            }}>
              {/* Status Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  backgroundColor: 'var(--brand-light)',
                  color: 'var(--brand-dark)',
                  fontSize: '12px',
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: '999px',
                  border: '1px solid var(--brand-border)',
                  fontFamily: 'var(--font-heading)'
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--brand-primary)', display: 'inline-block' }} />
                  {searchResult.status}
                </span>

                <span style={{ fontSize: '12.5px', fontWeight: 500, color: 'var(--text-muted)' }}>
                  PNR: <strong style={{ color: 'var(--midnight)' }}>{searchResult.pnr}</strong>
                </span>
              </div>

              {/* Bus Details */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--midnight)', fontFamily: 'var(--font-heading)' }}>
                  {searchResult.operator}
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                  Coach: {searchResult.busNumber} • Berth {searchResult.seat}
                </div>
              </div>

              {/* Real-time Location Info */}
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '6px',
                padding: '12px',
                border: '1px solid var(--border-light)',
                marginBottom: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                  <MapPin size={15} style={{ color: 'var(--brand-primary)', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>
                      Current Live GPS Location
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--midnight)' }}>
                      {searchResult.currentLocation}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <Clock size={15} style={{ color: '#0284c7', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>
                      Estimated Arrival at Destination
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--midnight)' }}>
                      {searchResult.estimatedArrival}
                    </div>
                  </div>
                </div>
              </div>

              {/* Driver Contact */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '12.5px',
                color: '#475569'
              }}>
                <div>
                  Driver: <strong>{searchResult.driverName}</strong>
                </div>
                <a
                  href={`tel:${searchResult.driverPhone}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'var(--brand-dark)',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  <Phone size={12} />
                  Call Crew
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
