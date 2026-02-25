import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [contactFormData, setContactFormData] = useState({
    visitorName: '',
    visitorEmail: '',
    visitorPhone: '',
    visitorMessage: ''
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);

  const handleContactFormChange = (e) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactFormSubmit = async (e) => {
    e.preventDefault();
    setIsFormLoading(true);

    try {
      console.log('Contact Form submitted:', contactFormData);
      setIsFormSubmitted(true);
      setContactFormData({ visitorName: '', visitorEmail: '', visitorPhone: '', visitorMessage: '' });
      setTimeout(() => setIsFormSubmitted(false), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsFormLoading(false);
    }
  };

  return (
    <section id="contact" className="contactSection">
      <div className="pageContainer">

        {/* Section Header */}
        <div className="sectionHeader">
          <h2 className="sectionTitle">
            Get In Touch
          </h2>
          <p className="sectionDescription">
            Have questions? We'd love to hear from you. Send us a message!
          </p>
        </div>

        {/* Contact Content Grid */}
        <div className="layoutResponsiveGrid2">

          {/* Contact Information Section */}
          <div className="formFieldsList">

            {/* Email Contact Info */}
            <div className="inlineAlignedGroupLg">
              <div className="primarySurface onPrimaryText circleRadius p-3 flex justify-center items-center">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="darkText fontMedium">Email</h3>
                <p className="mutedText">rajeshwaryjaffna@gmail.com</p>
              </div>
            </div>

            {/* Phone Contact Info */}
            <div className="inlineAlignedGroupLg">
              <div className="primarySurface onPrimaryText circleRadius p-3 flex justify-center items-center">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="darkText fontMedium">Phone</h3>
                <p className="mutedText">21 205 3999</p>
              </div>
            </div>

            {/* Address Contact Info */}
            <div className="inlineAlignedGroupLg">
              <div className="primarySurface onPrimaryText circleRadius p-3 flex justify-center items-center">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="darkText fontMedium">Address</h3>
                <p className="mutedText leading-relaxed">
                  Raajeshwary Hall<br />
                  132, Palali Road<br />
                  Kondavil, Jaffna
                </p>
              </div>
            </div>

          </div>

          {/* Contact Form Section */}
          <div className="softSurface cardRadius subtleShadow p-8">
            <form onSubmit={handleContactFormSubmit} className="formFieldsList">

              {/* Form Success Message */}
              {isFormSubmitted && (
                <div className="accentHighlight primaryText cardRadius p-4 border subtleBorder text-sm fontMedium">
                  ✓ Thank you! We'll get back to you soon.
                </div>
              )}

              {/* Name Input Field */}
              <div className="formFieldGroup">
                <label className="formFieldLabel darkText fontMedium">
                  Full Name
                </label>
                <input
                  type="text"
                  name="visitorName"
                  value={contactFormData.visitorName}
                  onChange={handleContactFormChange}
                  required
                  placeholder="Your name"
                  className="formInput"
                />
              </div>

              {/* Email Input Field */}
              <div className="formFieldGroup">
                <label className="formFieldLabel darkText fontMedium">
                  Email Address
                </label>
                <input
                  type="email"
                  name="visitorEmail"
                  value={contactFormData.visitorEmail}
                  onChange={handleContactFormChange}
                  required
                  placeholder="your@email.com"
                  className="formInput"
                />
              </div>

              {/* Phone Input Field */}
              <div className="formFieldGroup">
                <label className="formFieldLabel darkText fontMedium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="visitorPhone"
                  value={contactFormData.visitorPhone}
                  onChange={handleContactFormChange}
                  required
                  placeholder="+94 XXXXX XXXXX"
                  className="formInput"
                />
              </div>

              {/* Message Input Field */}
              <div className="formFieldGroup">
                <label className="formFieldLabel darkText fontMedium">
                  Message
                </label>
                <textarea
                  name="visitorMessage"
                  value={contactFormData.visitorMessage}
                  onChange={handleContactFormChange}
                  required
                  placeholder="Tell us about your event..."
                  rows="4"
                  className="formTextarea"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isFormLoading}
                className="primarySurface onPrimaryText cardRadius w-full p-3 fontMedium flex items-center justify-center gap-3 transition-transform hover:scale-[1.02]"
              >
                <Send size={18} />
                {isFormLoading ? 'Sending...' : 'Send Message'}
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
