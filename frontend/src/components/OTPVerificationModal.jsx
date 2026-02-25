import React, { useState, useEffect } from 'react';
import { setToken } from '../utils/tokenStorage';

const OTPVerificationModal = ({ email, onClose, onVerified, formData }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [otpTimer, setOtpTimer] = useState(60);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    let interval;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      setCanResendOtp(true);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && !isVerified) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose, isVerified]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/register/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          otp,
          name: formData.name,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Email verified! Completing registration...');
        setIsVerified(true);
        if (data.token) {
          setToken(data.token);
        }
        setTimeout(() => {
          onVerified(data);
        }, 1500);
      } else {
        setError(data.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/register/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('OTP resent to your email');
        setOtpTimer(60);
        setCanResendOtp(false);
        setOtp('');
      } else {
        setError(data.message || 'Failed to resend OTP');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modalSurface cardRadius subtleShadow relative">
      <div className="modalBody p-8">
        {!isVerified && (
          <button
            onClick={onClose}
            className="modalCloseButton"
            style={{ color: '#6b7280', position: 'absolute', top: '1rem', right: '1rem' }}
          >
            ✕
          </button>
        )}

        <div className="mb-6 text-center">
          <h2 className="modalTitle primaryText text-2xl font-bold">
            {!isVerified ? 'Verify Your Email' : 'Success'}
          </h2>
        </div>

        {error && <div className="errorBox errorSurface errorText cardRadius p-3 mb-4">{error}</div>}
        {success && <div className="successMessageBox cardRadius p-3 mb-4">{success}</div>}

        {!isVerified ? (
          <form onSubmit={handleVerifyOTP} className="formFieldsList">
            <div className="text-center mb-4">
              <p className="mutedText text-sm">
                We've sent a verification code to <br />
                <span className="fontMedium darkText">{email}</span>
              </p>
            </div>

            <div className="formFieldGroup">
              <label className="formFieldLabel darkText fontMedium">Verification Code</label>
              <input
                type="text"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength="6"
                required
                className="formInput text-center text-xl tracking-widest font-bold"
              />
            </div>

            <div className="text-center text-xs mutedText">
              {otpTimer > 0 ? (
                <p>Resend code in <span className="fontMedium">{otpTimer}s</span></p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={!canResendOtp || loading}
                  className="footerLinkButton text-xs"
                >
                  Resend Code
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="primarySurface onPrimaryText cardRadius w-full p-3 fontMedium transition-transform hover:scale-[1.02]"
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="subtleBorder mutedText cardRadius w-full p-2 text-sm fontMedium accentHighlight mt-2"
            >
              Cancel
            </button>
          </form>
        ) : (
          <div className="text-center space-y-6 py-6">
            <div className="primarySurface onPrimaryText circleRadius w-16 h-16 flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            <p className="darkText fontMedium">
              Registration successful! <br />
              <span className="mutedText text-sm">Redirecting to dashboard...</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OTPVerificationModal;
