/**
 * @file DataSecurityPopup.jsx
 * @brief A modal popup to inform the user about the demo mode's data handling.
 *
 * This component renders a popup that clarifies that no personal data (like the user's
 * email) is being collected or stored. It's designed to be shown after a user
 * interacts with a form, such as the email sign-up form on the landing page, to
 * reassure them about their data privacy in this demo context.
 */
import React from 'react';

const DataSecurityPopup = ({ isOpen, onClose }) => {
  // The component is not rendered if the `isOpen` prop is false.
  if (!isOpen) return null;

  return (
    <div className="security-overlay">
        <div className="security-modal">
            {/* 
              A decorative icon container with a green glow, providing visual feedback
              that communicates a sense of security and success.
            */}
            <div className="security-icon-container" style={{ background: 'rgba(50, 215, 75, 0.15)' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#32D74B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 12l2 2 4-4" stroke="#32D74B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>

            <h3 className="security-title">Demo Mode</h3>
            
            <p className="security-desc">
                No personal data is saved. <br/>
                Your email was not sent to any server because this is a purely frontend demonstration.
            </p>

            <button 
                className="security-btn" 
                onClick={onClose} 
                style={{ background: '#303030', color: '#32D74B' }}
            >
                OK
            </button>
        </div>
    </div>
  );
};

export default DataSecurityPopup;
