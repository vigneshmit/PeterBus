import React from "react";
import { Bus, Star, CheckCircle } from "lucide-react";
import { OPERATOR_PARTNERS } from "../data/busData";

export default function OperatorPartners() {
  return (
    <section
      style={{
        padding: "50px 0",
        backgroundColor: "#F8FAFC",
        borderBottom: "1px solid #E2E8F0",
      }}
    >
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--brand-dark)",
            }}
          >
            Trusted Travel Alliance
          </span>
          <h2
            style={{
              fontSize: "25px",
              fontWeight: 700,
              color: "#0F172A",
              marginTop: "6px",
              fontFamily: "var(--font-heading)"
            }}
          >
            Official Fleet & Bus Operator Partners
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
          }}
        >
          {OPERATOR_PARTNERS.map((partner, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                border: "1px solid #E2E8F0",
                padding: "16px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  backgroundColor: "var(--brand-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--brand-primary)",
                }}
              >
                <Bus size={20} />
              </div>
              <div
                style={{ fontWeight: 600, fontSize: "15px", color: "#0F172A", fontFamily: "var(--font-heading)" }}
              >
                {partner.name}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#D97706",
                }}
              >
                <span>{partner.rating}</span>
                <span style={{ color: "#94A3B8", fontWeight: 500 }}>
                  • {partner.fleet}
                </span>
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--brand-dark)",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                }}
              >
                <CheckCircle size={11} /> Verified Partner
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
