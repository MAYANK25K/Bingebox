/**
 * @file ProfileSelection.jsx
 * @brief Component for the "Who's watching?" profile selection screen.
 *
 * This component displays a list of user profiles, allowing the user to select one
 * to proceed to the main browsing interface. The profile data is currently mocked
 * for demonstration purposes.
 */
import React from 'react';

const ProfileSelection = ({ onSelectProfile }) => {
  /**
   * A static array of user profiles. In a real-world application, this data would
   * be fetched from a backend service.
   */
  const profiles = [
    { id: 1, name: 'User', img: 'https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.webp' },
    { id: 2, name: 'Kids', img: 'https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg' },
    { id: 3, name: 'Guest', img: 'https://wallpapers.com/images/high/netflix-profile-pictures-5yup5hd2i60x7ew3.webp' }
  ];

  return (
    <div className="fixed inset-0 bg-[#141414] z-50 flex flex-col items-center justify-center animate-fade-in">
      <h1 className="text-3xl md:text-5xl text-white font-normal mb-8 md:mb-12 transition-all duration-300">Who's watching?</h1>
      
      <div className="flex gap-4 md:gap-8 flex-wrap justify-center">
        {profiles.map((profile) => (
          <div 
            key={profile.id} 
            onClick={onSelectProfile}
            className="group flex flex-col items-center cursor-pointer w-24 md:w-40 gap-3"
          >
            {/* Avatar with a border that appears on hover for visual feedback. */}
            <div className="w-24 h-24 md:w-40 md:h-40 rounded md:rounded-md overflow-hidden border-2 border-transparent group-hover:border-white transition-all duration-200">
              <img 
                src={profile.img} 
                alt={`${profile.name} profile avatar`}
                className="w-full h-full object-cover"
                // Defensive coding: If an avatar image fails to load, it falls back to a default.
                onError={(e) => { e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' }}
              />
            </div>
            {/* Profile name, which highlights on hover. */}
            <span className="text-gray-400 text-sm md:text-xl group-hover:text-white transition-colors duration-200">
              {profile.name}
            </span>
          </div>
        ))}
      </div>

      {/* A disabled-style button for managing profiles. It is non-functional in this demo. */}
      <button className="mt-12 md:mt-20 px-6 py-2 border border-gray-500 text-gray-500 text-sm md:text-lg tracking-widest hover:border-white hover:text-white transition-all duration-200 uppercase">
        Manage Profiles
      </button>

      {/* 
        Inline style for a simple fade-in animation.
        This is a micro-optimization to avoid creating a separate CSS file for a single-use animation.
      */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.5s ease-out; }
      `}</style>
    </div>
  );
};

export default ProfileSelection;
