import React, { useState } from "react";
import {
  Smartphone,
  Star,
  QrCode,
  CheckCircle,
  Send,
  Bell,
  Zap,
  Shield,
} from "lucide-react";

export default function AppDownloadBanner() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [linkSent, setLinkSent] = useState(false);

  const handleSendLink = (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }
    setLinkSent(true);
    setTimeout(() => {
      setPhoneNumber("");
      setLinkSent(false);
    }, 4000);
  };

  return (
    <section
      style={{
        padding: "70px 0",
        backgroundColor: "#0F172A",
        color: "#FFFFFF",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative backdrop glow */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(217, 35, 56, 0.25) 0%, rgba(15, 23, 42, 0) 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "40px",
            alignItems: "center",
          }}
          className="app-download-grid"
        >
          {/* Left Text & Form */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "rgba(217, 35, 56, 0.15)",
                border: "1px solid rgba(217, 35, 56, 0.4)",
                color: "#FDA4AF",
                padding: "4px 12px",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: 700,
                marginBottom: "16px",
              }}
            >
              <Smartphone size={14} />
              <span>PeterBus Mobile App</span>
            </div>

            <h2
              style={{
                fontSize: "clamp(28px, 3.5vw, 38px)",
                fontWeight: 800,
                color: "#FFFFFF",
                lineHeight: 1.2,
                marginBottom: "16px",
              }}
            >
              Book Tickets in 30 Seconds with the PeterBus App
            </h2>

            <p
              style={{
                fontSize: "15px",
                color: "#94A3B8",
                lineHeight: 1.6,
                marginBottom: "24px",
              }}
            >
              Enjoy exclusive mobile-only app discounts, live bus location push
              alerts, 1-tap ticket downloads, and offline WhatsApp tickets.
            </p>

            {/* Feature Bullets */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginBottom: "28px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  color: "#E2E8F0",
                }}
              >
                <CheckCircle size={16} style={{ color: "#10B981" }} />
                <span>Live GPS Tracking Notifications</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  color: "#E2E8F0",
                }}
              >
                <CheckCircle size={16} style={{ color: "#10B981" }} />
                <span>Faster 1-Click UPI Checkout</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  color: "#E2E8F0",
                }}
              >
                <CheckCircle size={16} style={{ color: "#10B981" }} />
                <span>Zero Booking Fees on App</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  color: "#E2E8F0",
                }}
              >
                <CheckCircle size={16} style={{ color: "#10B981" }} />
                <span>24/7 In-App Chat Support</span>
              </div>
            </div>

            {/* SMS Link Input Form */}
            <form onSubmit={handleSendLink} style={{ maxWidth: "440px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#CBD5E1",
                  marginBottom: "8px",
                }}
              >
                Get the app download link via SMS:
              </label>
              <div style={{ display: "flex", gap: "8px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#1E293B",
                    border: "1px solid #334155",
                    borderRadius: "10px",
                    padding: "0 12px",
                    flex: 1,
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#94A3B8",
                      marginRight: "6px",
                    }}
                  >
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="Enter 10-digit mobile number"
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(e.target.value.replace(/\D/g, ""))
                    }
                    style={{
                      width: "100%",
                      background: "none",
                      border: "none",
                      outline: "none",
                      color: "#FFFFFF",
                      fontSize: "14px",
                      padding: "12px 0",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    padding: "0 20px",
                    borderRadius: "10px",
                    fontSize: "13px",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Send size={15} />
                  <span>Send Link</span>
                </button>
              </div>

              {linkSent && (
                <div
                  style={{
                    marginTop: "10px",
                    color: "#34D399",
                    fontSize: "12px",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <CheckCircle size={14} /> SMS link sent to +91{" "}
                  {phoneNumber || "your number"}! Check your messages.
                </div>
              )}
            </form>
          </div>

          {/* Right Card / Phone mockup visual */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#1E293B",
                border: "2px solid #334155",
                borderRadius: "24px",
                padding: "28px",
                width: "100%",
                maxWidth: "340px",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  margin: "0 auto 16px",
                  borderRadius: "18px",
                  background:
                    "linear-gradient(135deg, #D92338 0%, #B91C1C 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 16px rgba(217, 35, 56, 0.4)",
                }}
              >
                <Smartphone size={36} color="#FFFFFF" />
              </div>

              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  marginBottom: "4px",
                }}
              >
                PeterBus Mobile
              </h3>
              <p
                style={{
                  fontSize: "12px",
                  color: "#94A3B8",
                  marginBottom: "18px",
                }}
              >
                Available on Android & iOS
              </p>

              {/* QR Code Mock */}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "14px",
                  padding: "16px",
                  display: "inline-block",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    width: "120px",
                    height: "120px",
                    backgroundColor: "#0F172A",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <QrCode size={56} />
                  <span
                    style={{
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                    }}
                  >
                    SCAN TO DOWNLOAD
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  fontSize: "13px",
                  color: "#CBD5E1",
                }}
              >
                <Star size={14} fill="#F59E0B" color="#F59E0B" />
                <span style={{ fontWeight: 700, color: "#FFFFFF" }}>
                  4.8 Rating
                </span>
                <span>• 1M+ Downloads</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .app-download-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
