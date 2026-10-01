import React from 'react';
import { ShieldCheck, Clock, UserCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export default function WhyPeterBus() {
  return (
    <section id="experience" className="experience-section">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px' }}>
          <div className="section-badge-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '999px', padding: '3px 12px' }}>
            <Sparkles size={13} style={{ color: 'var(--brand-primary)' }} />
            <span>The PeterBus Standard</span>
          </div>
          <h2 className="section-heading-title" style={{ marginTop: '8px', marginBottom: '8px' }}>
            Engineered for Stress-Free Travel
          </h2>
          <p className="section-subtext">
            Say goodbye to unreliable buses and endless delays. We combined modern technology with luxury fleet standards.
          </p>
        </div>

        {/* Modern Clean Bento Grid */}
        <div className="bento-grid-container">

          {/* BENTO CARD 1: Live GPS Radar */}
          <div className="bento-grid-card bento-col-7">
            {/* Ambient radar glow in background */}
            <div className="radar-ambient-glow" />

            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(4, 135, 120, 0.15)',
                border: '1px solid rgba(4, 135, 120, 0.35)',
                color: 'var(--brand-primary)',
                padding: '3px 10px',
                borderRadius: '999px',
                fontSize: '11.5px',
                fontWeight: 600,
                marginBottom: '12px',
                fontFamily: 'var(--font-heading)'
              }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--brand-primary)', display: 'inline-block' }} />
                REAL-TIME TELEMETRY
              </div>

              <h3 className="bento-feature-title" style={{ color: '#ffffff', fontSize: '19px' }}>
                Live GPS Radar & Driver Telemetry
              </h3>
              <p style={{ fontSize: '14px', color: '#9CA3AF', maxWidth: '420px', lineHeight: 1.5, marginBottom: '18px' }}>
                Track your bus pinpoint on the map. Share real-time automated WhatsApp tracking links with family for complete peace of mind.
              </p>
            </div>

            {/* Interactive Mock Radar Widget inside card */}
            <div className="radar-widget-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--brand-primary)', boxShadow: '0 0 8px var(--brand-primary)' }} />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF', fontFamily: 'var(--font-heading)' }}>
                    Coach TN 01 BV 4488 (Club Class)
                  </span>
                </div>
                <span style={{ fontSize: '11.5px', color: 'var(--brand-border)', fontWeight: 500, backgroundColor: 'rgba(4, 135, 120, 0.2)', padding: '2px 7px', borderRadius: '4px' }}>
                  68 km/h
                </span>
              </div>

              {/* Progress Line */}
              <div style={{
                position: 'relative',
                height: '4px',
                backgroundColor: '#374151',
                borderRadius: '2px',
                margin: '10px 0 8px'
              }}>
                <div style={{
                  width: '65%',
                  height: '100%',
                  backgroundColor: 'var(--brand-primary)',
                  borderRadius: '2px',
                  position: 'relative'
                }}>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    border: '2px solid var(--brand-primary)',
                    position: 'absolute',
                    right: '-5px',
                    top: '-3px'
                  }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#9CA3AF' }}>
                <span>KCBT Kilambakkam</span>
                <span style={{ color: '#F3F4F6', fontWeight: 500 }}>Tindivanam Toll</span>
                <span style={{ color: 'var(--brand-border)', fontWeight: 600 }}>ETA: 05:15 AM</span>
              </div>
            </div>
          </div>

          {/* BENTO CARD 2: Zero Fee Refund */}
          <div className="bento-grid-card bento-col-5">
            <div>
              <div className="bento-icon-badge teal">
                <ShieldCheck size={20} />
              </div>

              <h3 className="bento-feature-title" style={{ color: 'var(--midnight)' }}>
                100% Zero-Fee Cancellation
              </h3>
              <p className="bento-feature-desc" style={{ marginBottom: '14px' }}>
                Cancel up to 4 hours before departure and receive instant refunds directly back into your UPI account (GPay/PhonePe).
              </p>
            </div>

            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              border: '1px solid var(--border-light)',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500 }}>Refund Speed</div>
                <div style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--brand-dark)', fontFamily: 'var(--font-heading)' }}>Under 10 Minutes</div>
              </div>
              <div style={{ fontSize: '11px', fontWeight: 600, backgroundColor: 'var(--brand-light)', color: 'var(--brand-dark)', padding: '2px 8px', borderRadius: '4px' }}>
                ₹0 DEDUCTION
              </div>
            </div>
          </div>

          {/* BENTO CARD 3: Female Passenger Safety */}
          <div className="bento-grid-card bento-col-6">
            <div>
              <div className="bento-icon-badge pink">
                <UserCheck size={20} />
              </div>

              <h3 className="bento-feature-title" style={{ color: 'var(--midnight)' }}>
                Female Traveler Safety Priority
              </h3>
              <p className="bento-feature-desc">
                Designated women-only sleeper berths where adjacent berths can only be booked by female travelers. 24/7 emergency support.
              </p>
            </div>

            <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 500, color: '#DB2777', backgroundColor: '#FDF2F8', padding: '3px 8px', borderRadius: '4px' }}>
                <CheckCircle2 size={12} /> Dedicated Berths
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 500, color: 'var(--brand-dark)', backgroundColor: 'var(--brand-light)', padding: '3px 8px', borderRadius: '4px' }}>
                <CheckCircle2 size={12} /> SOS Enabled
              </span>
            </div>
          </div>

          {/* BENTO CARD 4: Premium Fleet Standards */}
          <div className="bento-grid-card bento-col-6">
            <div>
              <div className="bento-icon-badge blue">
                <Clock size={20} />
              </div>

              <h3 className="bento-feature-title" style={{ color: 'var(--midnight)' }}>
                98.8% On-Time Departure Assurance
              </h3>
              <p className="bento-feature-desc">
                Strict operational monitoring. If your bus is delayed by over 30 minutes at primary terminal hubs, you receive automated travel credits.
              </p>
            </div>

            <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 500, color: '#2563EB', backgroundColor: '#EFF6FF', padding: '3px 8px', borderRadius: '4px' }}>
                <CheckCircle2 size={12} /> Punctuality: 98.8%
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 500, color: 'var(--brand-dark)', backgroundColor: 'var(--brand-light)', padding: '3px 8px', borderRadius: '4px' }}>
                <CheckCircle2 size={12} /> Delay Compensation
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
