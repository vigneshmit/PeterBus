import React, { useState } from "react";
import { Bus, User, Menu, Ticket, X, Navigation, LogOut, CheckCircle2 } from "lucide-react";

export default function Navbar({ 
  currentUser, 
  onLogout, 
  onOpenLookup, 
  onOpenHelp, 
  onOpenLogin 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container">
        <div className="navbar-inner">
          {/* Brand Logo */}
          <a href="#" className="brand-logo-link">
            <div className="brand-icon-box">
              <Bus size={18} strokeWidth={2.2} />
            </div>
            <div className="brand-title-wrap">
              <span className="brand-text">
                Peter<span className="brand-text-accent">Bus</span>
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="desktop-nav-links">
            <a href="#destinations" className="nav-item-link">
              Destinations
            </a>
            <a href="#search" className="nav-item-link">
              Find Buses
            </a>
            <a href="#offers" className="nav-item-link">
              Offers
            </a>
            <a href="#experience" className="nav-item-link">
              Experience
            </a>
            <a href="#faqs" className="nav-item-link">
              Help
            </a>
          </nav>

          {/* Right Actions */}
          <div className="nav-right-actions">
            {/* Manage Booking */}
            <button
              onClick={() => onOpenLookup("ticket")}
              className="btn-ghost nav-ticket-btn"
            >
              <Ticket size={13} style={{ color: "var(--brand-primary)" }} />
              <span>My Ticket</span>
            </button>

            {/* User Profile or Sign In */}
            {currentUser ? (
              <div className="nav-user-profile-wrap">
                <div 
                  className="nav-user-chip" 
                  title={`Signed in as ${currentUser.name || currentUser.username}`}
                >
                  <div className="user-avatar-circle">
                    {(currentUser.name || currentUser.username || "U").charAt(0).toUpperCase()}
                  </div>
                  <span className="user-name-label">
                    {currentUser.name || currentUser.username}
                  </span>
                </div>
                <button 
                  onClick={onLogout} 
                  className="nav-logout-btn" 
                  title="Sign out"
                >
                  <LogOut size={13} />
                  <span className="d-none-mobile">Logout</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => onOpenLogin ? onOpenLogin() : onOpenHelp()} 
                className="btn-primary nav-signin-btn"
              >
                <User size={13} />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="mobile-hamburger"
              aria-label="Open Navigation Menu"
            >
              <Menu size={18} color="#0f172a" />
            </button>
          </div>
        </div>
      </div>

      {/* Lightweight Native Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 999,
            display: "flex",
            justifyContent: "flex-end",
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              width: "280px",
              height: "100%",
              backgroundColor: "#ffffff",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              boxShadow: "-4px 0 20px rgba(0,0,0,0.15)",
              animation: "fadeIn 0.2s ease",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "var(--midnight)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                Menu
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{ padding: "4px", cursor: "pointer" }}
              >
                <X size={18} color="#0f172a" />
              </button>
            </div>

            <div className="drawer-nav-list">
              <a
                href="#destinations"
                onClick={() => setMobileMenuOpen(false)}
                className="drawer-nav-item"
              >
                Destinations
              </a>
              <a
                href="#search"
                onClick={() => setMobileMenuOpen(false)}
                className="drawer-nav-item"
              >
                Find Buses
              </a>
              <a
                href="#offers"
                onClick={() => setMobileMenuOpen(false)}
                className="drawer-nav-item"
              >
                Offers & Passes
              </a>
              <a
                href="#experience"
                onClick={() => setMobileMenuOpen(false)}
                className="drawer-nav-item"
              >
                The Peter Standard
              </a>
              <a
                href="#faqs"
                onClick={() => setMobileMenuOpen(false)}
                className="drawer-nav-item"
              >
                Help & FAQs
              </a>
              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid var(--border-light)",
                  margin: "8px 0",
                }}
              />
              {currentUser ? (
                <div className="drawer-user-card">
                  <div className="drawer-user-info">
                    <div className="user-avatar-circle">
                      {(currentUser.name || currentUser.username || "U").charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="drawer-user-name">{currentUser.name || currentUser.username}</div>
                      <div className="drawer-user-role">Verified Passenger</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="drawer-logout-btn"
                  >
                    <LogOut size={13} />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  className="btn-dark"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenLogin) onOpenLogin();
                  }}
                  style={{ width: "100%", justifyContent: "center", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}
                >
                  <User size={14} />
                  <span>Sign In / Register</span>
                </button>
              )}
              <button
                className="btn-primary"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLookup("track");
                }}
                style={{ width: "100%", justifyContent: "center", display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <Navigation size={14} />
                <span>Live Bus GPS Radar</span>
              </button>
              <button
                className="btn-ghost"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLookup("ticket");
                }}
                style={{ width: "100%", justifyContent: "center", display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                <Ticket size={14} />
                <span>View Ticket & Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
