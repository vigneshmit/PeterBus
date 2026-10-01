import React from "react";
import { Star, CheckCircle2 } from "lucide-react";
import { TESTIMONIALS } from "../data/busData";

export default function Testimonials() {
  return (
    <section
      style={{
        padding: "44px 0 48px",
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #E2E8F0",
      }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            maxWidth: "600px",
            margin: "0 auto 32px",
          }}
        >
          <span
            style={{
              fontSize: "12.5px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "var(--brand-dark)",
              backgroundColor: "var(--brand-light)",
              padding: "3px 10px",
              borderRadius: "999px",
              fontFamily: "var(--font-heading)",
            }}
          >
            Passenger Stories
          </span>
          <h2
            style={{
              fontSize: "25px",
              fontWeight: 600,
              color: "#0F172A",
              letterSpacing: "-0.02em",
              marginTop: "8px",
              marginBottom: "6px",
              fontFamily: "var(--font-heading)",
            }}
          >
            Loved by Over 2 Million Travelers
          </h2>
          <p style={{ fontSize: "14.5px", color: "#64748B", margin: 0 }}>
            Read verified feedback from everyday commuters, families, and solo
            travelers across South India.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "#F8FAFC",
                borderRadius: "12px",
                border: "1px solid #E2E8F0",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <div>
                {/* Rating stars */}
                <div
                  style={{ display: "flex", gap: "3px", marginBottom: "12px" }}
                >
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>

                <p
                  style={{
                    fontSize: "14.5px",
                    color: "#334155",
                    lineHeight: 1.5,
                    fontStyle: "italic",
                    marginBottom: "16px",
                  }}
                >
                  "{item.text}"
                </p>
              </div>

              {/* User details */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  borderTop: "1px solid #E2E8F0",
                  paddingTop: "12px",
                }}
              >
                <img
                  src={item.avatar}
                  alt={item.name}
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #FFFFFF",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                  }}
                />
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "14.5px",
                        fontWeight: 600,
                        color: "#0F172A",
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {item.name}
                    </span>
                    <CheckCircle2 size={12} style={{ color: "#10B981" }} />
                  </div>
                  <span style={{ fontSize: "12.5px", color: "#64748B" }}>
                    {item.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
