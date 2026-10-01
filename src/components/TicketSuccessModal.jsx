import React from 'react';
import { CheckCircle2, Download, QrCode, X, ShieldCheck } from 'lucide-react';

export default function TicketSuccessModal({ bookingData, onClose }) {
  if (!bookingData) return null;

  const { bus, seats = [], boarding, dropping, total } = bookingData;
  const pnr = bookingData.pnr || `PB-${Math.floor(100000 + Math.random() * 900000)}`;
  const passengerName = bookingData.passenger || 'Valued Passenger';
  const customerMobile = bookingData.mobile || '9489442570';
  const seatsList = Array.isArray(seats) ? seats.map(s => s.id || s).join(', ') : seats;
  const fareFormatted = Number(total || 0).toLocaleString('en-IN');

  const handleDownload = () => {
    alert(`Official PDF E-Ticket for PNR ${pnr} downloaded!`);
  };

  const handleOpenWhatsApp = () => {
    const cleanPhone = customerMobile.replace(/[^0-9]/g, '').slice(-10);
    const waText = encodeURIComponent(
`━━━━━━━━━━━━━━━━━━━━━━━━━
✨ *P E T E R B U S   L U X U R Y   L I N E S* ✨
*Official Electronic M-Ticket*
━━━━━━━━━━━━━━━━━━━━━━━━━

🎫 *BOOKING REFERENCE (PNR)*
*${pnr}* • _Confirmed & Active_

👤 *PASSENGER DETAILS*
• *Primary Passenger:* ${passengerName}
• *Mobile Number:* +91 ${cleanPhone}

🚍 *COACH & SEAT RESERVATION*
• *Operator:* ${bus?.operator || 'PeterBus Club Class'}
• *Fleet:* ${bus?.busType || 'Volvo Multi-Axle 9600 A/C Sleeper'}
• *Reserved Berth(s):* *${seatsList}*
• *Total Fare Paid:* *₹${fareFormatted}* (Online Confirmed)

📍 *BOARDING & DROPPING TIMELINE*
🟢 *Boarding:* ${boarding || 'Kilambakkam (KCBT), Chennai'}
🔴 *Dropping:* ${dropping || 'Madiwala, Bengaluru'}

📡 *LIVE RADAR GPS TRACKING*
🔗 https://peterbus.in/track/${pnr}

ℹ️ *ESSENTIAL TRAVEL GUIDELINES*
• Please report 15 mins prior to departure.
• Present this M-Ticket or PNR during boarding.
• 24/7 Helpline: *+91 94894 42570*

_Wish you a pleasant & safe journey with PeterBus!_ 🌟
━━━━━━━━━━━━━━━━━━━━━━━━━`
    );
    window.open(`https://wa.me/91${cleanPhone}?text=${waText}`, '_blank');
  };

  return (
    <div className="ticket-modal-backdrop" onClick={onClose}>
      <div className="ticket-pass-card" onClick={(e) => e.stopPropagation()}>
        {/* Header: Emerald Boarding Pass */}
        <div className="ticket-pass-header">
          <button onClick={onClose} className="ticket-close-btn" aria-label="Close modal">
            <X size={16} />
          </button>

          <div className="ticket-success-icon-wrap">
            <CheckCircle2 size={28} strokeWidth={2.4} />
          </div>

          <div className="ticket-pill-badge">
            <ShieldCheck size={12} />
            <span>Official E-Ticket Confirmed</span>
          </div>

          <h3 className="ticket-header-title">Booking Confirmed!</h3>
          <p className="ticket-header-subtitle">
            M-Ticket & live GPS tracking link sent to your phone.
          </p>
        </div>

        {/* Perforated Notches */}
        <div className="ticket-perforation-wrap">
          <div className="ticket-notch notch-left" />
          <div className="ticket-dashed-line" />
          <div className="ticket-notch notch-right" />
        </div>

        {/* Ticket Content Body */}
        <div className="ticket-pass-body">
          {/* PNR & QR Code Banner */}
          <div className="ticket-pnr-banner">
            <div>
              <div className="pnr-label">Booking Reference</div>
              <div className="pnr-code">{pnr}</div>
              <div className="pnr-passenger">
                <span>Passenger:</span>
                <strong>{passengerName}</strong>
              </div>
            </div>

            <div className="pnr-qr-wrap" title="Scan for instant boarding verification">
              <QrCode size={46} color="#0f172a" />
            </div>
          </div>

          {/* Coach & Berths */}
          <div className="ticket-coach-strip">
            <div>
              <div className="coach-operator">{bus?.operator || 'PeterBus Luxury Lines'}</div>
              <div className="coach-fleet">{bus?.busType || 'Volvo Multi-Axle 9600 A/C Sleeper'}</div>
            </div>
            <div className="coach-berths-tag">
              Berth {seatsList}
            </div>
          </div>

          {/* Route Timeline */}
          <div className="ticket-route-timeline">
            <div className="timeline-connector" />

            <div className="timeline-item">
              <div className="point-indicator start" />
              <div className="point-details">
                <div className="point-type">Boarding Point</div>
                <div className="point-name">{boarding || 'Kilambakkam (KCBT) - 21:30'}</div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="point-indicator end" />
              <div className="point-details">
                <div className="point-type">Dropping Point</div>
                <div className="point-name">{dropping || 'Madiwala, Bengaluru - 05:15'}</div>
              </div>
            </div>
          </div>

          {/* Fare Summary */}
          <div className="ticket-fare-strip">
            <span className="fare-label">Total Amount Paid</span>
            <span className="fare-amount">
              ₹{fareFormatted}
              <span className="fare-status">PAID ONLINE</span>
            </span>
          </div>

          {/* WhatsApp Auto Dispatch Notification */}
          <div className="ticket-whatsapp-alert">
            <div className="wa-icon-pill">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </div>
            <div className="wa-text-group">
              <div className="wa-title">
                <span className="wa-pulse-dot" />
                <span>WhatsApp M-Ticket Dispatched!</span>
              </div>
              <div className="wa-desc">
                Sent to <strong>+91 {customerMobile}</strong> from <strong>+91 9489442570</strong>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="ticket-actions-row">
            <button
              type="button"
              onClick={handleOpenWhatsApp}
              className="btn-whatsapp-direct"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span>View on WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="btn-pdf-download"
            >
              <Download size={15} />
              <span>Download PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="btn-done"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
