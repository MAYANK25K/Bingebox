/**
 * @file Banner.jsx
 * @brief Hero banner with Critical Asset Preloading and Race Condition Protection.
 */
import React, { useState, useEffect } from 'react';
import axios from "./axios";
import requests from "./requests";
import YouTube from 'react-youtube';
import { Play, Info, X, Plus, Check } from 'lucide-react'; 
import { useMyList } from './context/MyListContext'; 

const Banner = () => {
    // Initialized as null to prevent crash risks
    const [movie, setMovie] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [showError, setShowError] = useState(false);
    const [bgPosition, setBgPosition] = useState("center top");

    const { isInMyList, toggleMyList } = useMyList();
    const isAdded = movie?.id ? isInMyList(movie.id) : false;

    // FIX: Added isMounted check to prevent flashing/race conditions in StrictMode
    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            try {
                const request = await axios.get(requests.fetchNetflixOriginals);
                
                // Only update state if the component is still mounted
                if (isMounted) {
                    const randomMovie = request.data.results[
                        Math.floor(Math.random() * request.data.results.length)
                    ];
                    setMovie(randomMovie);
                }
                return request;
            } catch (error) {
                console.error("Banner fetch failed:", error);
            }
        }
        
        fetchData();

        // Cleanup function: runs when component unmounts or re-runs
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setBgPosition("center top"); 
            } else {
                setBgPosition("center 15%"); 
            }
        };

        handleResize(); 
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlePlay = async () => {
        if (trailerUrl) { setTrailerUrl(""); return; } 
        try {
            const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
            const response = await fetch(`https://api.themoviedb.org/3/tv/${movie.id}/videos?api_key=${API_KEY}&language=en-US`);
            const data = await response.json();
            const trailer = data.results?.find(vid => vid.site === "YouTube" && (vid.type === "Trailer" || vid.type === "Teaser"));
            if (trailer) { setTrailerUrl(trailer.key); setShowError(false); } else { setShowError(true); }
        } catch (error) { setShowError(true); }
    };

    const closePopup = () => { setTrailerUrl(""); setShowError(false); };

    return (
        <header 
            className="relative h-[55vh] md:h-[85vh] text-white object-cover transition-all duration-500"
            style={{
                backgroundImage: movie?.backdrop_path ? `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")` : "none",
                backgroundSize: "cover",
                backgroundPosition: bgPosition, 
            }}
        >
            {/* OPTIMIZATION: Hidden high-priority preload for smooth hero reveal */}
            {movie?.backdrop_path && (
                <img 
                    src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} 
                    style={{ display: 'none' }} 
                    alt="preload"
                    fetchPriority="high" // Modern browser hint
                />
            )}

            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 w-full p-4 md:pl-12 pb-8 md:pb-12 z-20 flex flex-col justify-end h-full">
                <h1 className="text-3xl md:text-6xl lg:text-7xl font-black drop-shadow-2xl mb-2 md:mb-4 max-w-2xl leading-none md:leading-[0.9] gpu-accel">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                <p className="text-white text-xs md:text-lg font-medium drop-shadow-md mb-4 md:mb-6 max-w-[90%] md:max-w-xl line-clamp-3 text-shadow-md">
                    {movie?.overview}
                </p>

                <div className="flex gap-3">
                    <button onClick={handlePlay} className="cursor-pointer bg-white text-black font-bold rounded-[4px] px-6 md:px-8 py-2 md:py-3 hover:bg-[#ffffffbf] transition flex items-center gap-2 text-sm md:text-xl active:scale-95 duration-200">
                        <Play fill="black" size={20} /> Play
                    </button>
                    
                    <button 
                        onClick={() => toggleMyList(movie)} 
                        className="cursor-pointer bg-[rgba(109,109,110,0.7)] text-white font-bold rounded-[4px] px-6 md:px-8 py-2 md:py-3 hover:bg-[rgba(109,109,110,0.4)] transition flex items-center gap-2 text-sm md:text-xl backdrop-blur-sm active:scale-95 duration-200"
                    >
                        {isAdded ? <Check size={20} /> : <Plus size={20} />} 
                        {isAdded ? "Added" : "My List"}
                    </button>
                </div>
            </div>

            <div className="h-[6rem] md:h-[8rem] bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent absolute bottom-0 w-full z-10" />

            {trailerUrl && (
                <div className="security-overlay" onClick={closePopup}>
                    <div className="security-modal trailer-mode" onClick={(e) => e.stopPropagation()}>
                        <div className="trailer-header">
                             <span className="text-white font-semibold text-sm">Playing Trailer</span>
                             <button onClick={closePopup} className="p-1.5 bg-[#3a3a3c] rounded-full hover:bg-[#505052] transition"><X size={16} className="text-white" /></button>
                        </div>
                        <div className="trailer-container">
                            <YouTube videoId={trailerUrl} opts={{ height: '100%', width: '100%', playerVars: { autoplay: 1, playsinline: 0, controls: 1 } }} className="w-full h-full" />
                        </div>
                    </div>
                </div>
            )}
            {showError && (
                <div className="security-overlay" onClick={closePopup}>
                    <div className="security-modal">
                        <div className="mx-auto mt-4 mb-4 w-14 h-14 flex items-center justify-center rounded-full bg-red-500/10"><Info className="text-red-500 w-8 h-8" /></div>
                        <h3 className="security-title">Trailer Unavailable</h3>
                        <p className="security-desc">We couldn't find a trailer for this specific title.</p>
                        <button className="security-btn" onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Banner;