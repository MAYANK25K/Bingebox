/**
 * @file App.jsx
 * @brief Main application component with Lazy Loading & Suspense implemented.
 */
import React, { useState, useEffect, Suspense } from 'react';

// --- EAGER IMPORTS (Load immediately for fast Landing Page) ---
import Hero from './components/Hero';
import TrendingNow from './components/TrendingNow';
import Reasons from './components/Reasons';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import DataSecurityPopup from './components/DataSecurityPopup';
import DisclaimerModal from './components/DisclaimerModal';

// --- LAZY IMPORTS (Load only when needed to save bandwidth) ---
// These files are split into separate "chunks" and downloaded on demand.
const NetflixIntro = React.lazy(() => import('./NetflixIntro'));
const ProfileSelection = React.lazy(() => import('./ProfileSelection'));
const Browse = React.lazy(() => import('./Browse'));

/**
 * A simple, reusable Loading Spinner component.
 * Displays a red spinning ring on a black background.
 */
const Loading = () => (
  <div className="fixed inset-0 bg-black z-[999] flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#E50914]"></div>
  </div>
);

function App() {
  const [view, setView] = useState('landing');
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [isSecurityPopupOpen, setIsSecurityPopupOpen] = useState(false);

  useEffect(() => {
    setShowDisclaimer(true);
  }, []);

  const handleCloseDisclaimer = () => setShowDisclaimer(false);
  const handleGetStarted = () => setIsSecurityPopupOpen(true);
  
  const handleSecurityPopupClose = () => {
    setIsSecurityPopupOpen(false);
    setView('intro'); // Triggers the download of NetflixIntro
  };

  const handleIntroComplete = () => setView('profiles');
  const handleProfileSelect = () => setView('browse');

  return (
    <>
      {showDisclaimer && <DisclaimerModal onClose={handleCloseDisclaimer} />}

      {/* Landing Page - Rendered Immediately (No Suspense needed here) */}
      {view === 'landing' && (
        <div className="bg-black text-white">
          <Hero onGetStarted={handleGetStarted} />
          <TrendingNow />
          <Reasons />
          <FAQ onGetStarted={handleGetStarted} />
          <Footer />
          <DataSecurityPopup 
            isOpen={isSecurityPopupOpen} 
            onClose={handleSecurityPopupClose} 
            variant="demo" 
          />
        </div>
      )}

      {/* Suspense Boundary:
        Wraps the lazy-loaded components. If the user switches to 'intro', 'profiles', 
        or 'browse', React shows the <Loading /> spinner while fetching the code.
      */}
      <Suspense fallback={<Loading />}>
        {view === 'intro' && <NetflixIntro onComplete={handleIntroComplete} />}
        {view === 'profiles' && <ProfileSelection onSelectProfile={handleProfileSelect} />}
        {view === 'browse' && <Browse />}
      </Suspense>
    </>
  );
}

export default App;