import React, { useState } from 'react';
import { Tag as TagIcon, Sparkles, Copy, Check } from 'lucide-react';
import { PROMO_OFFERS } from '../data/busData';

export default function PromoOffers({ onApplyPromo }) {
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard?.writeText?.(code);
    setCopiedCode(code);
    onApplyPromo?.(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section id="offers" className="offers-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-row">
          <div>
            <div className="section-badge-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '999px', padding: '3px 12px' }}>
              <Sparkles size={12} style={{ color: 'var(--brand-primary)' }} />
              <span>Instant Discounts</span>
            </div>
            <h2 className="section-heading-title">
              Coupons & Travel Passes
            </h2>
            <p className="section-subtext">
              Apply promo codes at checkout for instant fare discounts across all routes.
            </p>
          </div>

          <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--brand-dark)', fontFamily: 'var(--font-heading)' }}>
            4 Deals Active Today
          </div>
        </div>

        {/* Promo Cards Grid */}
        <div className="promo-cards-grid">
          {PROMO_OFFERS.map((promo) => {
            const isCopied = copiedCode === promo.code;

            return (
              <div
                key={promo.code}
                className="promo-item-card"
              >
                <div>
                  <div className="promo-card-top">
                    <span style={{
                      fontSize: '11.5px',
                      fontWeight: 600,
                      backgroundColor: 'var(--brand-light)',
                      color: 'var(--brand-dark)',
                      padding: '2px 7px',
                      borderRadius: '4px',
                      border: '1px solid var(--brand-border)'
                    }}>
                      {promo.badge}
                    </span>
                    <span className="promo-expiry-text">
                      {promo.validTill}
                    </span>
                  </div>

                  <h3 className="promo-title-text">
                    {promo.title}
                  </h3>
                  <p className="promo-desc-text">
                    {promo.description}
                  </p>
                </div>

                {/* Coupon Code Pill */}
                <div className="promo-coupon-strip">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <TagIcon size={13} style={{ color: 'var(--brand-primary)' }} />
                    <span className="promo-code-text">
                      {promo.code}
                    </span>
                  </div>

                  {/* Copy Button */}
                  <button
                    type="button"
                    onClick={() => handleCopy(promo.code)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '12px',
                      fontWeight: 500,
                      padding: '4px 10px',
                      borderRadius: '5px',
                      backgroundColor: isCopied ? 'var(--brand-primary)' : 'var(--midnight)',
                      color: '#ffffff',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {isCopied ? (
                      <>
                        <Check size={11} /> Copied
                      </>
                    ) : (
                      <>
                        <Copy size={11} /> Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
