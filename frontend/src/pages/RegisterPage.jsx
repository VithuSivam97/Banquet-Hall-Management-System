import React, { useState, useEffect } from 'react';
import { GlassWater } from 'lucide-react';
import { setToken } from '../utils/tokenStorage';
import OTPVerificationModal from '../components/OTPVerificationModal';

const RegisterPage = ({ onNavigateToLogin, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [tempEmail, setTempEmail] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const otpResponse = await fetch('http://127.0.0.1:5000/api/auth/register/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });

      const otpData = await otpResponse.json();

      if (otpResponse.ok) {
        setTempEmail(formData.email);
        setShowOTPModal(true);
        setSuccess('OTP sent to your email!');
      } else {
        if (otpData.code === 'USER_EXISTS') {
          setErrors({ email: 'This email is already registered. Please log in instead.' });
        } else {
          setErrors({ submit: otpData.message || 'Failed to send OTP. Please try again.' });
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'An error occurred. Please check your connection and try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerified = (data) => {
    if (data.token) {
      setToken(data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setShowOTPModal(false);
    setTimeout(() => {
      window.location.href = '/clientdashboard';
    }, 2000);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && !showOTPModal) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showOTPModal, onClose]);

  return (
    <>
      <div className="scrimOverlay" onClick={onClose}></div>

      <div className="centeredModalWrapper">
        <div className="modalSurface cardRadius subtleShadow">
          <div className="modalBanner primarySurface onPrimaryText">
            <button
              onClick={onClose}
              className="modalCloseButton"
              title="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="flex justify-center mb-2">
              <GlassWater size={36} />
            </div>
            <h1 className="text-xl font-bold">Raajeshwary Hall</h1>
            <p className="smallItalicText onPrimaryText opacity-90">Plan. Book. Celebrate.</p>
          </div>

          <div className="modalBody">
            <h2 className="modalTitle primaryText">Create Account</h2>

            {errors.submit && <div className="errorBox errorSurface errorText cardRadius">{errors.submit}</div>}
            {success && <div className="successMessageBox cardRadius">{success}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="formFieldGroup">
                <label className="formFieldLabel">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="formInput"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div className="formFieldGroup">
                <label className="formFieldLabel">Email address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="formInput"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div className="formFieldGroup">
                <label className="formFieldLabel">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="formInput"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div className="formFieldGroup">
                <label className="formFieldLabel">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="formInput"
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="submitButton"
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>

            <div className="authDivider">
              <div className="dividerLine"></div>
              <span className="dividerText">Or continue with</span>
              <div className="dividerLine"></div>
            </div>

            <button className="googleButton">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-4 h-4"
              />
              Register with Google
            </button>
          </div>

          <div className="modalFooter">
            <span>Already have an account? </span>
            <button
              onClick={onNavigateToLogin}
              className="footerLinkButton"
            >
              Login Here
            </button>
          </div>
        </div>
      </div>

      {showOTPModal && (
        <div className="modalContainerZ60">
          <div className="modalOverlayZ60" onClick={() => setShowOTPModal(false)}></div>
          <div className="relative z-60 w-full max-w-md">
            <OTPVerificationModal
              email={tempEmail}
              formData={formData}
              onClose={() => setShowOTPModal(false)}
              onVerified={handleOTPVerified}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterPage;
