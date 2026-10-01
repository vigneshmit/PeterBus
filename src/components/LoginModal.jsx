import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Lock, 
  User, 
  ShieldCheck,
  CheckCircle2,
  Bus,
  Sparkles,
  Eye,
  EyeOff
} from 'lucide-react';

const FLEET_SLIDES = [
  {
    id: 1,
    title: "VOLVO 9600 CLUB CLASS",
    subtitle: "Ultra-Luxury Panoramic Sleeper",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    title: "SCANIA METROLINK HD",
    subtitle: "Multi-Axle Active Suspension",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    title: "MERCEDES-BENZ SHD",
    subtitle: "Executive Business Class Berth",
    image: "https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 4,
    title: "BHARATBENZ INTERCITY",
    subtitle: "Climate Controlled Express Line",
    image: "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?auto=format&fit=crop&w=1200&q=80"
  }
];

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [passengerName, setPassengerName] = useState('Vicky');
  const [mobileNumber, setMobileNumber] = useState('9489442570');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Automatic Background Bus Slide Carousel (every 4 seconds)
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === FLEET_SLIDES.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrevSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? FLEET_SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === FLEET_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passengerName.trim()) {
      setErrorMsg('Please enter your name');
      return;
    }
    if (!mobileNumber.trim() || mobileNumber.replace(/[^0-9]/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit WhatsApp mobile number');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('Please enter your password');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const cleanPhone = mobileNumber.replace(/[^0-9]/g, '').slice(-10);
      const userPayload = {
        name: passengerName.trim(),
        username: passengerName.trim(),
        mobile: cleanPhone,
        loggedInAt: new Date().toISOString()
      };
      if (onLoginSuccess) {
        onLoginSuccess(userPayload);
      }
      onClose();
    }, 500);
  };

  const activeSlide = FLEET_SLIDES[currentSlide];

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div 
        className="login-modal-canvas immersive-bus-stage" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Full-bleed Luxury Bus Background with smooth fade */}
        <div 
          className="stage-bus-bg"
          style={{ backgroundImage: `url(${activeSlide.image})` }}
        />
        <div className="stage-overlay" />

        {/* Top Header inside Immersive Stage */}
        <div className="stage-top-navbar">
          <div className="stage-brand-group">
            <div className="stage-logo">
              <Bus size={18} strokeWidth={2.2} />
              <span>PETER<span>BUS</span></span>
            </div>
          </div>

          <div className="stage-header-actions">
            <button 
              type="button" 
              onClick={onClose} 
              className="stage-close-btn"
              title="Close modal"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Center Floating Frosted Glass Blur Card */}
        <div className="stage-center-viewport">
          <div className="login-floating-card immersive-card">
            <div className="card-kicker">
              {activeSlide.subtitle}
            </div>
            <h3 className="card-login-title">
              {authMode === 'login' ? 'Login to your account' : 'Create new account'}
            </h3>

            {errorMsg && (
              <div className="login-error-msg">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              {/* Passenger Name Field */}
              <div className="login-field-item">
                <label>Passenger Name</label>
                <input 
                  type="text" 
                  value={passengerName}
                  onChange={(e) => {
                    setPassengerName(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="e.g. Vicky"
                  required
                />
              </div>

              {/* WhatsApp Mobile Number Field */}
              <div className="login-field-item">
                <label>WhatsApp Mobile Number</label>
                <input 
                  type="tel" 
                  value={mobileNumber}
                  onChange={(e) => {
                    setMobileNumber(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="e.g. 9489442570"
                  required
                />
              </div>

              {/* Password Field with Eye Toggle */}
              <div className="login-field-item">
                <label>Password</label>
                <div className="login-password-wrap">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="••••••••••••"
                    required
                  />
                  <button 
                    type="button" 
                    className="toggle-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? "Hide password" : "Show password"}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password Row */}
              <div className="login-options-row">
                <label className="remember-wrap">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>

                <a 
                  href="#forgot" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    alert("Password reset OTP sent to registered mobile/email."); 
                  }}
                  className="forgot-link"
                >
                  Forgot password?
                </a>
              </div>

              {/* Solid Black Pill Submit Button */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="login-black-pill-btn"
              >
                {isSubmitting ? (
                  'signing in...'
                ) : (
                  authMode === 'login' ? 'login' : 'create account'
                )}
              </button>
            </form>

            {/* Switch Mode Link inside the card */}
            <div className="card-switch-footer">
              <span className="switch-text">
                {authMode === 'login' ? "Don't have account?" : "Already have account?"}
              </span>
              <button
                type="button"
                className="switch-inline-btn"
                onClick={() => {
                  setAuthMode(authMode === 'login' ? 'register' : 'login');
                  setErrorMsg('');
                }}
              >
                <span>{authMode === 'login' ? 'Create account' : 'Sign in'}</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Slide Counter & Arrow Controls */}
        <div className="stage-bottom-bar">
          <div className="slide-counter">
            0{activeSlide.id} / 0{FLEET_SLIDES.length}
          </div>

          <div className="slide-arrow-group">
            <button 
              type="button" 
              onClick={handlePrevSlide}
              title="Previous fleet slide"
              aria-label="Previous fleet slide"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              type="button" 
              onClick={handleNextSlide}
              title="Next fleet slide"
              aria-label="Next fleet slide"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

