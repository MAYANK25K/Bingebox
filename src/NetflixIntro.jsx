/**
 * @file NetflixIntro.jsx
 * @brief A component that displays the classic Netflix startup animation.
 *
 * This component renders a full-screen, black background with a zooming "N"
 * logo, simulating the iconic Netflix intro. After a fixed duration (3.5s),
 * it calls the `onComplete` prop to signal that the animation has finished,
 * allowing the parent component to transition to the next view.
 */
import React, { useEffect, useState } from 'react';

const NetflixIntro = ({ onComplete }) => {
  // State to control the visibility of the intro. It is removed from the DOM after animation.
  const [show, setShow] = useState(true);

  useEffect(() => {
    /**
     * The total duration of the intro animation is 3.5 seconds.
     * After this time, the `onComplete` callback is fired to transition
     * to the next part of the application (e.g., profile selection).
     */
    const animationDuration = 3500;
    const timer = setTimeout(() => {
      setShow(false);
      if (onComplete) onComplete();
    }, animationDuration);

    // Cleanup function to clear the timer if the component unmounts prematurely.
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Render nothing if the animation is complete, allowing the next view to appear.
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden">
      {/* 
        The main animation container for the "N" logo.
        The `animate-netflix-zoom` class (defined in the CSS) handles the scaling effect.
      */}
      <div className="animate-netflix-zoom relative w-[20vw] h-[35vw] md:w-[10vw] md:h-[18vw]">
         {/* 
           The Netflix logo is loaded from an external SVG source.
           This is a common practice for widely recognized logos to ensure high quality.
         */}
         <img 
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
            alt="Netflix Logo" 
            className="w-full h-full object-contain drop-shadow-2xl"
         />
      </div>
      
      {/* 
        An optional decorative element to simulate a subtle sound wave or light flash effect.
      */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-600/20 to-transparent opacity-0 animate-pulse" style={{ animationDelay: '1s', animationDuration: '0.5s' }} />
    </div>
  );
};

export default NetflixIntro;
