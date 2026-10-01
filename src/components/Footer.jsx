import React from 'react';
import { Bus, ShieldCheck, PhoneCall, Mail, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        {/* Main Footer Links */}
        <div className="footer-main-grid">
          {/* Brand Info */}
          <div className="footer-brand-summary">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div className="brand-icon-box">
                <Bus size={18} strokeWidth={2.2} />
              </div>
              <span className="brand-text" style={{ color: '#FFFFFF' }}>
                peter<span className="brand-text-accent">bus</span>
              </span>
            </div>

            <p style={{ color: '#9CA3AF', lineHeight: 1.5, marginBottom: '16px', fontSize: '13.5px' }}>
              Smart intercity coach network connecting 1,200+ destinations across South India with real-time GPS tracking and zero-fee cancellations.
            </p>

            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <PhoneCall size={13} style={{ color: 'var(--brand-primary)' }} />
                <span style={{ fontWeight: 500 }}>1800-420-PETER (24x7 Support)</span>
              </div>
              <div className="footer-contact-item">
                <Mail size={13} style={{ color: 'var(--brand-primary)' }} />
                <span>care@peterbus.in</span>
              </div>
            </div>
          </div>

          {/* Top South Routes */}
          <div>
            <h4 className="footer-col-title">
              Top Routes
            </h4>
            <ul className="footer-links-menu">
              <li>
                <a href="#search" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <span>Chennai</span>
                  <ArrowRight size={11} style={{ color: 'var(--brand-primary)' }} />
                  <span>Bengaluru Volvo</span>
                </a>
              </li>
              <li>
                <a href="#search" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <span>Bengaluru</span>
                  <ArrowRight size={11} style={{ color: 'var(--brand-primary)' }} />
                  <span>Coimbatore AC</span>
                </a>
              </li>
              <li>
                <a href="#search" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <span>Chennai</span>
                  <ArrowRight size={11} style={{ color: 'var(--brand-primary)' }} />
                  <span>Madurai Sleeper</span>
                </a>
              </li>
              <li>
                <a href="#search" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <span>Hyderabad</span>
                  <ArrowRight size={11} style={{ color: 'var(--brand-primary)' }} />
                  <span>Bengaluru Express</span>
                </a>
              </li>
              <li>
                <a href="#search" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <span>Bengaluru</span>
                  <ArrowRight size={11} style={{ color: 'var(--brand-primary)' }} />
                  <span>Kochi Multi-Axle</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Bus Operators */}
          <div>
            <h4 className="footer-col-title">
              Fleet Partners
            </h4>
            <ul className="footer-links-menu">
              <li><a href="#">Peter Express Club Class</a></li>
              <li><a href="#">Zingbus Smart Coaches</a></li>
              <li><a href="#">KPN Travels Gold</a></li>
              <li><a href="#">SRS Travels Royal</a></li>
              <li><a href="#">Parveen Travels Executive</a></li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="footer-col-title">
              Company & Policies
            </h4>
            <ul className="footer-links-menu">
              <li><a href="#">About PeterBus</a></li>
              <li><a href="#">Zero-Fee Refund Guarantee</a></li>
              <li><a href="#">Female Passenger Safety</a></li>
              <li><a href="#">Terms & Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-row">
          <div>
            © {new Date().getFullYear()} PeterBus Technologies Pvt Ltd. All rights reserved.
          </div>

          <div className="footer-security-tags">
            <span className="footer-ssl-badge">
              <ShieldCheck size={13} style={{ color: 'var(--brand-primary)' }} />
              256-Bit SSL Encrypted
            </span>
            <span>•</span>
            <span>UPI & Cards Accepted</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
