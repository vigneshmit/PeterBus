import React from 'react';
import { ArrowRight, Clock, Bus } from 'lucide-react';

const DESTINATIONS = [
  {
    id: 'blr',
    from: 'Chennai',
    to: 'Bengaluru',
    citySubtitle: 'Silicon Valley Corridor',
    price: 499,
    duration: '6h 15m',
    busesPerDay: 72,
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
    tags: ['Superfast', 'Night AC', 'Sleeper']
  },
  {
    id: 'cbe',
    from: 'Bengaluru',
    to: 'Coimbatore',
    citySubtitle: 'Textile Hub Expressway',
    price: 549,
    duration: '5h 45m',
    busesPerDay: 48,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    tags: ['Volvo Multi-Axle', 'Wi-Fi']
  },
  {
    id: 'mdu',
    from: 'Chennai',
    to: 'Madurai',
    citySubtitle: 'Temple City Express',
    price: 599,
    duration: '7h 30m',
    busesPerDay: 54,
    image: 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=800&q=80',
    tags: ['Club Class', 'Live GPS']
  },
  {
    id: 'hyd',
    from: 'Hyderabad',
    to: 'Bengaluru',
    citySubtitle: 'Cyberabad Highway',
    price: 699,
    duration: '8h 00m',
    busesPerDay: 60,
    image: 'https://images.unsplash.com/photo-1572445271230-a78b5944a659?auto=format&fit=crop&w=800&q=80',
    tags: ['Luxury Sleeper', 'Breakfast']
  },
  {
    id: 'koc',
    from: 'Bengaluru',
    to: 'Kochi',
    citySubtitle: 'Queen of the Arabian Sea',
    price: 749,
    duration: '9h 15m',
    busesPerDay: 36,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    tags: ['Volvo 9600', 'Blanket']
  },
  {
    id: 'pdy',
    from: 'Chennai',
    to: 'Puducherry',
    citySubtitle: 'East Coast Scenic Road',
    price: 299,
    duration: '3h 10m',
    busesPerDay: 85,
    image: 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?auto=format&fit=crop&w=800&q=80',
    tags: ['Every 30 Mins', 'ECR Scenic']
  }
];

export default function PopularRoutes({ onSelectRoute }) {
  return (
    <section id="destinations" className="destinations-section">
      <div className="container">
        {/* Section Heading */}
        <div className="section-header-row">
          <div>
            <span className="section-badge-pill">Top Routes</span>
            <h2 className="section-heading-title">Popular Destinations</h2>
            <p className="section-subtext">
              Frequent daily luxury coaches with live tracking and guaranteed lowest fares.
            </p>
          </div>

          <span className="section-right-stat">
            500+ daily departures
          </span>
        </div>

        {/* Visual Destination Cards Grid */}
        <div className="destinations-grid">
          {DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              onClick={() => onSelectRoute(dest.from, dest.to)}
              className="destination-card"
            >
              {/* Image banner */}
              <div className="dest-img-container">
                <img
                  src={dest.image}
                  alt={dest.to}
                  className="dest-img"
                />
                
                {/* Gradient overlay */}
                <div className="dest-gradient-layer" />

                {/* Price tag */}
                <div className="dest-price-tag">
                  from ₹{dest.price}
                </div>

                {/* Cities title on image bottom */}
                <div className="dest-cities-info">
                  <div className="dest-city-title">
                    <span>{dest.from}</span>
                    <ArrowRight size={13} color="var(--brand-border)" />
                    <span>{dest.to}</span>
                  </div>
                  <div className="dest-city-sub">
                    {dest.citySubtitle}
                  </div>
                </div>
              </div>

              {/* Card Details Bottom */}
              <div className="dest-card-bottom">
                <div className="dest-meta-info">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Clock size={12} style={{ color: 'var(--midnight)' }} />
                    {dest.duration}
                  </span>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Bus size={12} style={{ color: 'var(--brand-primary)' }} />
                    {dest.busesPerDay} Buses/day
                  </span>
                </div>

                <span className="dest-book-link">
                  Book <ArrowRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
