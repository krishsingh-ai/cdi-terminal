import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './hooks/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Intelligence from './pages/Intelligence';
import Backtest from './pages/Backtest';
import Methodology from './pages/Methodology';
import About from './pages/About';
import NotFound from './pages/NotFound';
import AuthModal from './components/auth/AuthModal';
import SideMenu from './components/layout/SideMenu';
import AdminSurveillanceModal from './components/admin/AdminSurveillanceModal';
import Toast from './components/ui/Toast';
import CommandPalette from './components/ui/CommandPalette';
import ConsentBanner from './components/consent/ConsentBanner';
import PrivacyPolicyModal from './components/consent/PrivacyPolicyModal';
import ErrorBoundary from './components/ui/ErrorBoundary';

function AppContent() {
  const {
    isCommandOpen,
    setIsCommandOpen,
    isPrivacyModalOpen,
    setIsPrivacyModalOpen,
  } = useAuth();

  // Global Keyboard Listener for Ctrl+K / Cmd+K and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsCommandOpen]);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/intelligence" element={<Intelligence />} />
          <Route path="/backtest" element={<Backtest />} />
          <Route path="/methodology" element={<Methodology />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>

      {/* Unescapable forced login modal when session is null */}
      <AuthModal />

      {/* Privacy and Cookie Consent Banner (first visit only) */}
      <ConsentBanner />

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      {/* Slide-in Side Menu */}
      <SideMenu />

      {/* Admin Surveillance Panel Modal */}
      <AdminSurveillanceModal />

      {/* Welcome and Status Toasts */}
      <Toast />

      {/* Command Palette (Ctrl+K / Cmd+K) */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />
    </>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <AppContent />
          </ErrorBoundary>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
