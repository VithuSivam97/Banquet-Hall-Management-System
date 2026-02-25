import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footerContainer">
      <div className="pageContainer">

        <div className="layoutResponsiveGrid3">

          {/* About Column */}
          <div className="footerAboutColumn">
            <h3 className="text-lg font-bold onPrimaryText mb-4">
              <span className="primaryText">Raajeshwary</span> Hall
            </h3>
            <p className="mutedText text-sm leading-relaxed">
              Creating magical moments for your special occasions with elegance and professionalism.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="fontMedium onPrimaryText mb-4">Quick Links</h4>
            <ul className="formFieldsList text-sm">
              <li><Link to="/" className="footerLink">Home</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="fontMedium onPrimaryText mb-4">Contact</h4>
            <div className="formFieldsList text-sm">
              <p className="mutedText">
                Email: <a href="mailto:rajeshwaryjaffna@gmail.com" className="primaryText">rajeshwaryjaffna@gmail.com</a>
              </p>
              <p className="mutedText">
                Phone: <a href="tel:212053999" className="primaryText">21 205 3999</a>
              </p>
            </div>
          </div>

        </div>

        {/* Divider Section */}
        <div className="footerDivider subtleBorder border-t pt-8 mt-12">

          {/* Bottom Section */}
          <div className="footerBottomLayout flex flex-col md:flex-row justify-between items-center gap-4">

            {/* Copyright */}
            <div className="mutedText text-sm">
              © {currentYear} Raajeshwary Hall. All rights reserved.
            </div>

            {/* Links */}
            <div className="inlineAlignedGroupMd text-sm">
              <a href="#" className="footerLink">Privacy Policy</a>
              <span className="mutedText">•</span>
              <a href="#" className="footerLink">Terms & Conditions</a>
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
