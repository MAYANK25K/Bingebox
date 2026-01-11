import React from 'react';

const Reasons = () => {
  const reasons = [
    {
      title: "Enjoy on your TV",
      desc: "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.",
      iconClass: "fas fa-tv",
      iconColor: "text-[#8b5cf6]" // Purple-ish for TV
    },
    {
      title: "Download your shows to watch offline",
      desc: "Save your favourites easily and always have something to watch.",
      iconClass: "fas fa-download",
      iconColor: "text-[#ec4899]" // Pink-ish for Download
    },
    {
      title: "Watch everywhere",
      desc: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
      iconClass: "fas fa-binoculars", // Telescope equivalent
      iconColor: "text-[#ef4444]" // Red-ish for Telescope
    },
    {
      title: "Create profiles for kids",
      desc: "Send children on adventures with their favourite characters in a space made just for them.",
      iconClass: "fas fa-smile",
      iconColor: "text-[#eab308]" // Yellow-ish for Kids
    }
  ];

  return (
    <section className="bg-black py-16 px-[4%] ">
      <h2 className="text-2xl font-medium mb-4 text-white">
        More reasons to join
      </h2>

      {/* Grid Layout: 
          - Mobile: 1 col
          - Sm/Md: 2 cols
          - Lg: 4 cols
          - Gap: 16px (gap-4)
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reasons.map((item, index) => (
          <div 
            key={index} 
            // Card Container
            // - min-h-[270px]: Ensures consistent height like screenshots
            // - Gradient: Matches the dark blue/purple tint of Netflix cards
            // - rounded-2xl: 16px border radius
            className="relative min-h-[270px] p-6 rounded-2xl bg-gradient-to-br from-[#192247] to-[#210e17] flex flex-col justify-between overflow-hidden"
          >
            {/* Text Content */}
            <div className="z-10">
              <h3 className="text-2xl font-medium mb-3 text-white">
                {item.title}
              </h3>
              <p className="text-[#bfbfbf] text-[1.05rem] leading-snug">
                {item.desc}
              </p>
            </div>

            {/* Icon (Bottom Right) */}
            <div className="absolute bottom-4 right-4">
              <i className={`${item.iconClass} text-5xl opacity-90 ${item.iconColor} drop-shadow-lg`}></i>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reasons;