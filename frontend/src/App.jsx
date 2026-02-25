import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfile from "./pages/UserProfile";
import AboutPage from "./pages/AboutPage";
import HallsPage from "./pages/HallsPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import Package from "./pages/Package";
import HallDetailPage from "./pages/HallDetailPage";
import HallPayment from "./pages/HallPayment";
import VendorDashboard from "./pages/VendorDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import { isAuthenticated } from "./utils/tokenStorage";

// Admin Dashboard Imports
import DashboardLayout from "./components/layout/DashboardLayout";
import OverviewDashboard from "./components/dashboard/Overview/OverviewDashboard";
import BookingsManagement from "./components/dashboard/Bookings/BookingsManagement";
import EventTracking from "./components/dashboard/Events/EventTracking";
import StaffManagement from "./components/dashboard/Staff/StaffManagement";
import VendorManagement from "./components/dashboard/Vendors/VendorManagement";
import PackageManagement from "./components/dashboard/Packages/PackageManagement";
import InventoryManagement from "./components/dashboard/Inventory/InventoryManagement";
import UserManagement from "./components/dashboard/Users/UserManagement";
import NotificationsCenter from "./components/dashboard/Notifications/NotificationsCenter";
import Settings from "./components/dashboard/Settings/Settings";
import ReportsAnalytics from "./components/dashboard/Reports/ReportsAnalytics";
import FeedbackReviews from "./components/dashboard/Feedback/FeedbackReviews";
import PlaceholderPage from "./components/dashboard/PlaceholderPage";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <Router>
      <div className={showLoginModal || showRegisterModal ? 'blur-sm' : ''}>
        <Routes>
          <Route path="/" element={
            <Home
              onNavigateToLogin={() => setShowLoginModal(true)}
              onNavigateToRegister={() => setShowRegisterModal(true)}
            />
          } />

          <Route path="/about" element={<AboutPage onNavigateToLogin={() => setShowLoginModal(true)} onNavigateToRegister={() => setShowRegisterModal(true)} />} />
          <Route path="/halls" element={<HallsPage onNavigateToLogin={() => setShowLoginModal(true)} onNavigateToRegister={() => setShowRegisterModal(true)} />} />
          <Route path="/hall/:id" element={<HallDetailPage onNavigateToLogin={() => setShowLoginModal(true)} onNavigateToRegister={() => setShowRegisterModal(true)} />} />
          <Route path="/services" element={<ServicesPage onNavigateToLogin={() => setShowLoginModal(true)} onNavigateToRegister={() => setShowRegisterModal(true)} />} />
          <Route path="/contact" element={<ContactPage onNavigateToLogin={() => setShowLoginModal(true)} onNavigateToRegister={() => setShowRegisterModal(true)} />} />
          <Route path="/packages" element={<Package onNavigateToLogin={() => setShowLoginModal(true)} onNavigateToRegister={() => setShowRegisterModal(true)} />} />
          <Route path="/payment" element={<HallPayment />} />

          {/* Existing Dashboards */}
          <Route path="/vendordashboard" element={isAuthenticated() ? <VendorDashboard /> : <Navigate to="/" />} />
          <Route path="/staffdashboard" element={isAuthenticated() ? <StaffDashboard /> : <Navigate to="/" />} />

          {/* User Dashboard */}
          <Route
            path="/clientdashboard"
            element={isAuthenticated() ? <UserProfile /> : <Navigate to="/" />}
          />

          <Route path="/admin" element={isAuthenticated() ? <DashboardLayout /> : <Navigate to="/" />} >
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<OverviewDashboard />} />
            <Route path="bookings" element={<BookingsManagement />} />
            <Route path="events" element={<EventTracking />} />
            <Route path="staff" element={<StaffManagement />} />
            <Route path="vendors" element={<VendorManagement />} />
            <Route path="packages" element={<PackageManagement />} />
            <Route path="inventory" element={<InventoryManagement />} />

            {/* Placeholders for remaining routes */}
            <Route path="users" element={<UserManagement />} />
            <Route path="reports" element={<ReportsAnalytics />} />
            <Route path="notifications" element={<NotificationsCenter />} />
            <Route path="feedback" element={<FeedbackReviews />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>

      {showLoginModal && (
        <Login
          onNavigateToRegister={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }}
          onClose={() => setShowLoginModal(false)}
        />
      )}

      {showRegisterModal && (
        <RegisterPage
          onNavigateToLogin={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
          onClose={() => setShowRegisterModal(false)}
        />
      )}
    </Router>
  );
}

export default App;
