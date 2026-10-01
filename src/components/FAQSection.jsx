import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { FAQS } from '../data/busData';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faqs" className="faqs-section">
      <div className="container faqs-container-box">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div className="section-badge-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', borderRadius: '999px', padding: '3px 12px' }}>
            <HelpCircle size={13} style={{ color: 'var(--brand-primary)' }} />
            <span>Got Questions?</span>
          </div>
          <h2 className="section-heading-title" style={{ marginTop: '8px', marginBottom: '6px' }}>
            Frequently Asked Questions
          </h2>
          <p className="section-subtext">
            Everything you need to know about booking, cancellations, live tracking, and boarding.
          </p>
        </div>

        {/* Clean Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  border: isOpen ? '1.5px solid var(--brand-primary)' : '1px solid var(--border-light)',
                  boxShadow: isOpen ? '0 4px 12px rgba(4, 135, 120, 0.08)' : '0 1px 2px rgba(9, 13, 22, 0.02)',
                  overflow: 'hidden',
                  transition: 'all 0.15s ease'
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    textAlign: 'left',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '15px', fontWeight: 600, color: isOpen ? 'var(--brand-dark)' : 'var(--midnight)', fontFamily: 'var(--font-heading)' }}>
                    {faq.q}
                  </span>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    backgroundColor: isOpen ? 'var(--brand-light)' : '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isOpen ? 'var(--brand-dark)' : 'var(--text-muted)',
                    flexShrink: 0,
                    transition: 'all 0.2s ease'
                  }}>
                    <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                  </div>
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 18px 14px',
                    fontSize: '14px',
                    lineHeight: 1.6,
                    color: '#475569',
                    borderTop: '1px solid #f8fafc'
                  }}>
                    {faq.a}
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
