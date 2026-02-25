import React, { useState } from 'react';
import { Menu, X, User, LogOut, PanelLeft } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isAuthenticated, removeToken } from '../utils/tokenStorage';
import { useSidebar } from '../hooks/useSidebar';

const Navbar = ({ onNavigateToLogin, onNavigateToRegister, showMyInfo = true, mockAuth = false, mockRole = null }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toggle: toggleSidebar } = useSidebar();

  const isAdminPage = location.pathname.startsWith('/admin');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    if (mockAuth) {
      // If it's a mock auth (like purely for UI demo), maybe just redirect home or reload
      navigate('/');
      return;
    }
    removeToken();
    localStorage.removeItem('user');
    setIsMobileMenuOpen(false);
    navigate('/');
    window.location.reload(); // Ensure state is cleared
  };

  const isHomePage = location.pathname === '/';

  const getNavLink = (id) => isHomePage ? `#${id}` : `/#${id}`;

  const user = JSON.parse(localStorage.getItem('user')) || {};

  // Use real auth unless mockAuth is true
  const isUserAuthenticated = isAuthenticated() || mockAuth;

  // Determine role: Mock role takes precedence if provided, otherwise real user role
  const effectiveRole = mockRole || user.role;

  const isAdmin = effectiveRole === 'Admin';
  const isStaff = effectiveRole === 'Staff';
  const isVendor = effectiveRole === 'Vendor';

  return (
    <nav className="topNavbar">
      <div className="navbarContainer">

        {/* Admin Sidebar Toggle (Mobile Only) */}
        {isAdminPage && (
          <button
            onClick={toggleSidebar}
            className="p-2 -ml-2 mr-2 rounded-md lg:hidden text-stone-600 hover:bg-stone-50"
            title="Toggle Admin Menu"
          >
            <PanelLeft size={24} />
          </button>
        )}

        {/* Website Logo */}
        <Link to="/" className="logoSection no-underline">
          <span className="primaryText">Raajeshwary</span>
          <span className="darkText"> Hall</span>
        </Link>

        {/* Desktop Navigation Group (Right Side) */}
        <div className="hidden md:flex items-center gap-8">
          <div className="desktopNavMenu">
            <Link to="/" className="navLink text-capitalize">Home</Link>
            <Link to="/about" className="navLink text-capitalize">About</Link>
            <Link to="/halls" className="navLink text-capitalize">Halls</Link>
            <Link to="/services" className="navLink text-capitalize">Services</Link>
            <Link to="/contact" className="navLink text-capitalize">Contact</Link>
          </div>

          <div className="inlineAlignedGroupMd">
            {isUserAuthenticated ? (
              <div className="flex items-center gap-4">
                {showMyInfo && (
                  <Link
                    to={isAdmin ? "/admin" : isStaff ? "/staffdashboard" : isVendor ? "/vendordashboard" : "/clientdashboard"}
                    className="primarySurface onPrimaryText cardRadius flex items-center gap-2 p-2 px-4 text-sm fontMedium transition-all hover:opacity-90 shadow-sm"
                  >
                    <User size={18} />
                    {isAdmin ? 'Admin Panel' : isStaff ? 'Staff Info' : isVendor ? 'Vendor Info' : 'My Info'}
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="loginButton flex items-center gap-2 text-capitalize"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={onNavigateToLogin}
                  className="loginButton text-capitalize"
                >
                  Login
                </button>
                <button
                  onClick={onNavigateToRegister}
                  className="registerButton text-capitalize"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={toggleMobileMenu}
          className="mobileMenuToggle"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="mobileMenuPanel">
          <div className="mobileMenuContent">
            <Link to="/" className="mobileNavLink text-capitalize" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/about" className="mobileNavLink text-capitalize" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            <Link to="/halls" className="mobileNavLink text-capitalize" onClick={() => setIsMobileMenuOpen(false)}>Halls</Link>
            <Link to="/services" className="mobileNavLink text-capitalize" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
            <Link to="/contact" className="mobileNavLink text-capitalize" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>

            <div className="flex flex-col gap-3 mt-2">
              {isUserAuthenticated ? (
                <>
                  {showMyInfo && (
                    <Link
                      to={isAdmin ? "/admin" : isStaff ? "/staffdashboard" : isVendor ? "/vendordashboard" : "/clientdashboard"}
                      className="primarySurface onPrimaryText cardRadius flex items-center justify-center gap-2 w-full p-2 text-sm fontMedium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User size={18} />
                      {isAdmin ? 'Admin Panel' : isStaff ? 'Staff Info' : isVendor ? 'Vendor Info' : 'My Info'}
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="mobileLoginButton flex items-center justify-center gap-2 text-capitalize"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { onNavigateToLogin(); setIsMobileMenuOpen(false); }}
                    className="mobileLoginButton text-capitalize"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => { onNavigateToRegister(); setIsMobileMenuOpen(false); }}
                    className="mobileRegisterButton text-capitalize"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
