/**
 * @file DisclaimerModal.jsx
 * @brief A modal to inform the user that the application is a clone for educational purposes.
 *
 * This component displays a one-time, non-dismissible (until the button is clicked)
 * modal to ensure every user is aware that this is not the official Netflix website.
 * It is typically shown once per session when the user first visits the site.
 */
import React from 'react';

const DisclaimerModal = ({ onClose }) => {
  return (
    // The overlay provides a backdrop that darkens the rest of the page, focusing user attention.
    <div className="security-overlay">
        <div className="security-modal">
            {/* 
              A decorative icon with a blue theme, using an "info" symbol to draw attention
              to the informational nature of the message.
            */}
            <div className="security-icon-container" style={{ background: 'rgba(10, 132, 255, 0.15)' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#0A84FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16V12" stroke="#0A84FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8H12.01" stroke="#0A84FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>

            <h3 className="security-title">Educational Project</h3>
            
            <p className="security-desc">
                This application is a portfolio clone created for learning purposes. It is <b>not</b> the official Netflix site.
            </p>

            {/* 
              The confirmation button. Clicking this will trigger the `onClose` callback,
              which should handle the dismissal of the modal.
            */}
            <button 
                className="security-btn" 
                onClick={onClose} 
                style={{ background: '#0A84FF', color: '#fff', boxShadow: '0 4px 12px rgba(10, 132, 255, 0.3)' }}
            >
                I Understand
            </button>
        </div>
    </div>
  );
};

export default DisclaimerModal;
