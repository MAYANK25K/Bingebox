import React from 'react';

const Navbar = () => {
  return (
    <nav className="absolute top-0 w-full z-50 p-6">
      <div className="max-w-300 mx-auto flex justify-between items-center">
        
        {/* Logo - Adjusted height for consistency */}
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" 
          alt="Netflix Logo" 
          className="h-8 md:h-10 lg:h-12" 
        />

        {/* Right Side Buttons */}
        <div className="flex gap-4 items-center">
          
          {/* Language Dropdown Container */}
          <div className="relative">
             {/* FORCED HEIGHT: h-[32px] ensures it matches the button exactly */}
            <select className="h-8 bg-black/40 text-white border border-gray-400 px-6 pl-2 rounded text-1rem font-medium appearance-none cursor-pointer focus:outline-white ">
              <option>English</option>
              <option>Hindi</option>
            </select>
            {/* Custom Arrow for perfect positioning */}
            <span className="absolute right-2 top-2.5 pointer-events-none text-white text-[10px]">▼</span>
          </div>

          {/* Sign In Button */}
          {/* FORCED HEIGHT: h-[32px] to match the dropdown */}
          <button className="h-8 bg-[#E50914] text-white px-4 rounded font-bold text-sm hover:bg-[#c11119] transition duration-200 whitespace-nowrap">
            Sign In
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;