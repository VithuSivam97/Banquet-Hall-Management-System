import React, { useState, useEffect } from 'react';
import { GlassWater } from 'lucide-react';
import { setToken } from '../utils/tokenStorage';
import ForgotPassword from '../components/ForgotPassword';

const Login = ({ onNavigateToRegister, onClose }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setSuccess('Login successful! Redirecting...');
        setFormData({ email: '', password: '' });
        setTimeout(() => {
          if (data.user?.role === 'Admin') {
            window.location.href = '/admin';
          } else if (data.user?.role === 'Staff') {
            window.location.href = '/staffdashboard';
          } else if (data.user?.role === 'Vendor') {
            window.location.href = '/vendordashboard';
          } else if (data.user?.role === 'Client') {
            window.location.href = '/clientdashboard';
          } else {
            window.location.href = '/clientdashboard'; // Default fallback for generic User
          }
        }, 1500);
      } else {
        if (data.code === 'USER_NOT_FOUND') {
          setError('This email is not registered. Please create an account first.');
        } else if (data.code === 'INVALID_PASSWORD') {
          setError('The password you entered is incorrect. Please try again.');
        } else {
          setError(data.error || data.message || 'Login failed');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && !showForgotPassword) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showForgotPassword, onClose]);

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

          <div className="p-6">
            <h2 className="modalTitle primaryText">Welcome Back</h2>

            {error && <div className="errorBox errorSurface errorText cardRadius">{error}</div>}
            {success && <div className="successMessageBox cardRadius">{success}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
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
              </div>

              <div className="flex justify-between items-center">
                <label className="checkboxSection">
                  <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="footerLinkButton text-xs"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="submitButton"
              >
                {loading ? 'Logging in...' : 'Login with Email'}
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
              Login with Google
            </button>
          </div>

          <div className="modalFooter">
            <span>Don't have an account? </span>
            <button
              onClick={onNavigateToRegister}
              className="footerLinkButton"
            >
              Register Here
            </button>
          </div>
        </div>
      </div>

      {showForgotPassword && (
        <div className="modalContainerZ60">
          <div
            className="modalOverlayZ60"
            onClick={() => setShowForgotPassword(false)}
          ></div>
          <div className="relative z-60 w-full max-w-md">
            <ForgotPassword onClose={() => setShowForgotPassword(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
