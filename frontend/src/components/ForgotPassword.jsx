import React, { useState, useEffect } from 'react';

const ForgotPassword = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);
  const [canResendOtp, setCanResendOtp] = useState(false);

  useEffect(() => {
    let interval;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    } else if (otpTimer === 0 && currentStep === 2) {
      setCanResendOtp(true);
    }
    return () => clearInterval(interval);
  }, [otpTimer, currentStep]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/forgot-password/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        setSuccess('OTP sent to your email. Check your inbox.');
        setCurrentStep(2);
        setOtpTimer(60);
        setCanResendOtp(false);
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerified = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/forgot-password/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();

      if (response.ok) {
        setSuccess('OTP verified successfully!');
        setCurrentStep(3);
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/forgot-password/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await response.json();

      if (response.ok) {
        setSuccess('Password reset successfully!');
        setIsPasswordReset(true);
        setTimeout(() => {
          handleBackToLogin();
        }, 2000);
      } else {
        setError(data.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setCurrentStep(1);
    setIsPasswordReset(false);
    setEmail('');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
    onClose();
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/forgot-password/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok) {
        setSuccess('OTP resent to your email');
        setOtpTimer(60);
        setCanResendOtp(false);
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
    <div className="forgotPasswordModalSurface">
      <button
        onClick={onClose}
        className="forgotPasswordCloseBtn"
      >
        ✕
      </button>

      <div className="forgotPasswordBody">
        <div className="forgotPasswordHeader">
          <h2 className="forgotPasswordTitle">
            {!isPasswordReset ? 'Reset Password' : 'Success'}
          </h2>
        </div>

        {error && <div className="errorMessageBox">{error}</div>}
        {success && <div className="successMessageBox">{success}</div>}

        {!isPasswordReset ? (
          <>
            {currentStep === 1 && (
              <form onSubmit={handleEmailSubmit} className="formFieldsList">
                <div className="formFieldGroup">
                  <label className="formFieldLabel">Enter your email address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="formInput"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="primarySubmitBtn"
                >
                  {loading ? 'Sending...' : 'Send OTP'}
                </button>
              </form>
            )}

            {currentStep === 2 && (
              <form onSubmit={(e) => { e.preventDefault(); handleOTPVerified(); }} className="formFieldsList">
                <div className="otpInstructionWrapper">
                  <p className="otpInstructionText">
                    We've sent an OTP to <br />
                    <span className="otpEmailHighlight">{email}</span>
                  </p>
                </div>
                <div className="formFieldGroup">
                  <label className="formFieldLabel">Enter OTP</label>
                  <input
                    type="text"
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength="6"
                    required
                    className="otpInput"
                  />
                </div>

                <div className="otpResendWrapper">
                  {otpTimer > 0 ? (
                    <p>Resend OTP in <span className="fontMedium">{otpTimer}s</span></p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={!canResendOtp || loading}
                      className="resendOtpBtn"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="primarySubmitBtn"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </form>
            )}

            {currentStep === 3 && (
              <form onSubmit={handlePasswordReset} className="formFieldsList">
                <div className="formFieldGroup">
                  <label className="formFieldLabel">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="formInput"
                  />
                </div>
                <div className="formFieldGroup">
                  <label className="formFieldLabel">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="formInput"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="primarySubmitBtn"
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            )}
          </>
        ) : (
          <div className="pwdResetSuccessWrapper">
            <div className="successCircleIcon">
              ✓
            </div>
            <p className="otpEmailHighlight">
              Your password has been reset successfully!
            </p>
            <button
              onClick={handleBackToLogin}
              className="primarySubmitBtn"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
