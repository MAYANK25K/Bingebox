/**
 * @file BrowseNavbar.jsx
 * @brief Navigation bar with Defered Value optimization for high-frequency input.
 */
import React, { useState, useEffect, useRef, useDeferredValue } from 'react';
import { Search, Bell, ChevronDown, X } from 'lucide-react';
import axios from '../axios';
import requests, { IMAGE_BASE_URL } from '../requests';

const BrowseNavbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    
    // UI Interaction States
    const [searchOpen, setSearchOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [notifications, setNotifications] = useState([]);

    // INPUT OPTIMIZATION: Controlled input with deferred value
    const [query, setQuery] = useState("");
    const deferredQuery = useDeferredValue(query); 
    
    const navRef = useRef(null);
    const searchInputRef = useRef(null);

    useEffect(() => {
        // PERFORMANCE: Logic inside here runs only when CPU is idle, preventing typing lag
        if (deferredQuery) {
            console.log("Searching for:", deferredQuery); 
            // In the future, trigger your search API call here
        }
    }, [deferredQuery]);

    useEffect(() => {
        async function fetchNotifications() {
            try {
                const request = await axios.get(requests.fetchUpcoming);
                setNotifications(request.data.results.slice(0, 3));
            } catch (error) { console.error("Failed to fetch notifications:", error); }
        }
        fetchNotifications();
    }, []);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setShowMobileMenu(false);
                setShowNotifications(false);
                setShowProfileMenu(false);
                if (!query) setSearchOpen(false); 
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [query]);

    useEffect(() => {
        if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
    }, [searchOpen]);

    const handleLogoClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

    return (
        <nav 
            ref={navRef}
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/80 to-transparent'}`}
        >
            <div className="flex items-center justify-between px-4 md:px-12 py-4 h-[68px]">
                
                <div className={`flex items-center gap-5 md:gap-8 ${searchOpen ? 'hidden md:flex' : 'flex'}`}>
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
                        alt="Netflix Logo" 
                        className="h-4 md:h-7 cursor-pointer hover:opacity-80 transition-opacity" 
                        onClick={handleLogoClick}
                    />

                    <ul className="hidden lg:flex items-center gap-6 text-sm text-[#e5e5e5]">
                        {['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List'].map((item) => (
                            <li key={item} className="font-medium hover:text-[#b3b3b3] transition cursor-pointer">{item}</li>
                        ))}
                    </ul>

                    <div 
                        className="lg:hidden relative flex items-center gap-1 text-white text-sm font-bold cursor-pointer hover:text-gray-300 transition select-none"
                        onClick={toggleMobileMenu}
                    >
                        Browse 
                        <ChevronDown size={14} className={`transition-transform duration-200 ${showMobileMenu ? 'rotate-180' : ''}`} />
                        
                        {showMobileMenu && (
                            <div className="fixed top-[70px] left-1/2 -translate-x-1/2 w-[90vw] max-w-[300px] bg-black/95 border border-[#333] shadow-2xl rounded fade-in slide-in-from-top-2 flex flex-col z-[60]">
                                <div className="h-[2px] w-full bg-white absolute top-0 left-0"></div>
                                <div className="flex flex-col py-2">
                                    {['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List'].map((item) => (
                                        <span key={item} className="px-5 py-3 text-[#b3b3b3] text-sm font-medium hover:bg-[#222] hover:text-white transition-all cursor-pointer text-center">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className={`flex items-center gap-2 md:gap-4 text-white ${searchOpen ? 'w-full md:w-auto justify-end' : ''}`}>
                    
                    <div className={`flex items-center border transition-all duration-300 rounded-full ${searchOpen ? 'border-white bg-black px-3 py-1.5 w-full md:w-[260px]' : 'border-transparent w-8'}`}>
                        <Search 
                            className="w-5 h-5 cursor-pointer hover:text-gray-300 min-w-[20px]" 
                            onClick={() => setSearchOpen(true)} 
                        />
                        <input 
                            ref={searchInputRef}
                            type="text" 
                            placeholder="Titles, people, genres"
                            className={`bg-transparent text-white text-sm outline-none ml-2 w-full placeholder-gray-400 ${searchOpen ? 'block' : 'hidden'}`}
                            // UPDATED: Controlled input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onBlur={() => { if (!query) setSearchOpen(false); }}
                        />
                        {searchOpen && (
                            <X className="w-4 h-4 text-gray-400 cursor-pointer hover:text-white ml-1" onClick={(e) => { e.stopPropagation(); setSearchOpen(false); setQuery(""); }} />
                        )}
                    </div>

                    <div className={`flex items-center gap-3 md:gap-4 ${searchOpen ? 'hidden md:flex' : 'flex'}`}>
                        <span className="hidden xl:block text-sm font-bold cursor-pointer hover:text-gray-300 transition">Children</span>
                        
                        <div className="relative">
                            <Bell 
                                className="w-5 h-5 md:w-6 md:h-6 cursor-pointer hover:text-gray-300 transition" 
                                onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}
                            />
                            {notifications.length > 0 && <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full animate-pulse pointer-events-none"></span>}
                            {showNotifications && (
                                <div className="fixed top-[70px] left-1/2 -translate-x-1/2 w-[90vw] max-w-[360px] md:absolute md:top-full md:right-0 md:left-auto md:translate-x-0 md:w-80 md:mt-4 bg-black/90 border border-[#333] border-t-[2px] border-t-white rounded shadow-2xl z-[60]">
                                    <div className="flex flex-col max-h-[60vh] overflow-y-auto no-scrollbar">
                                        <div className="px-4 py-3 text-xs font-bold text-gray-400 border-b border-[#333] bg-[#111]">Notifications</div>
                                        {notifications.map(movie => (
                                            <div key={movie.id} className="flex gap-3 p-3 hover:bg-[#222] cursor-pointer border-b border-[#333] transition-colors group">
                                                <img src={`${IMAGE_BASE_URL}${movie.backdrop_path}`} className="w-28 rounded object-cover" alt={`New arrival: ${movie.title}`} />
                                                <div className="flex flex-col justify-center">
                                                    <p className="text-[10px] uppercase tracking-wider text-[#dcdcdc] mb-1">New Arrival</p>
                                                    <p className="text-sm font-bold leading-tight group-hover:text-white transition">{movie.title}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        <div className="relative group">
                            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                                <img src="/assets/posters/1.webp" alt="User Profile" className="w-8 h-8 rounded transition group-hover:ring-2 ring-white" onError={(e) => e.target.src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'} />
                                <ChevronDown className={`w-4 h-4 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                            </div>
                            {showProfileMenu && (
                                <div className="fixed top-[70px] left-1/2 -translate-x-1/2 w-[90vw] max-w-[250px] md:absolute md:top-full md:right-0 md:left-auto md:translate-x-0 md:w-56 md:mt-4 bg-black/95 border border-[#333] rounded shadow-xl py-2 z-50">
                                    <div className="hidden md:block absolute -top-2 right-4 w-4 h-4 bg-black/95 border-l border-t border-[#333] rotate-45"></div>
                                    <div className="px-3 py-2 text-xs text-gray-400 cursor-default">Profiles</div>
                                    <div className="flex items-center gap-3 px-4 py-2 hover:bg-[#222] cursor-pointer transition-colors">
                                        <img src="/assets/posters/2.webp" className="w-6 h-6 rounded" alt="Kids profile" onError={(e) => e.target.src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'} />
                                        <span className="text-sm hover:underline">Kids</span>
                                    </div>
                                    <div className="flex items-center gap-3 px-4 py-2 hover:bg-[#222] cursor-pointer border-b border-[#333] mb-2 transition-colors">
                                        <img src="/assets/posters/3.webp" className="w-6 h-6 rounded" alt="Guest profile" onError={(e) => e.target.src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'} />
                                        <span className="text-sm hover:underline">Guest</span>
                                    </div>
                                    <div className="px-4 py-2 text-sm hover:underline cursor-pointer text-gray-300 hover:text-white">Manage Profiles</div>
                                    <div className="px-4 py-2 text-sm hover:underline cursor-pointer text-gray-300 hover:text-white">Account</div>
                                    <div className="px-4 py-2 text-sm hover:underline cursor-pointer text-gray-300 hover:text-white">Help Center</div>
                                    <div className="border-t border-[#333] mt-2 pt-2 px-4 py-2 text-sm hover:underline cursor-pointer text-center text-white">Sign out of Netflix</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default BrowseNavbar;