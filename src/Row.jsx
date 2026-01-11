/**
 * @file Row.jsx
 * @brief FINAL COMMIT: Fixed Rendering Glitches (Black UI), Tuned Physics, Smart Filtering.
 */
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Info, Plus, Check } from 'lucide-react';
import YouTube from 'react-youtube';
import { useMyList } from './context/MyListContext';
import { smoothScroll } from './utils/smoothScroll'; 

const Row = ({ title, fetchUrl, isLargeRow, moviesProp }) => {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [showError, setShowError] = useState(false);
    const rowRef = useRef(null);

    const { isInMyList, toggleMyList } = useMyList();

    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
    const POSTER_BASE_URL = "https://image.tmdb.org/t/p/original";

    useEffect(() => {
        if (moviesProp) {
            setMovies(moviesProp);
        } else if (fetchUrl) {
            async function fetchData() {
                try {
                    const response = await fetch(fetchUrl);
                    const data = await response.json();
                    setMovies(data.results || []);
                } catch (error) {
                    setMovies([]);
                }
            }
            fetchData();
        }
    }, [fetchUrl, moviesProp]);

    // SMART FILTER: Ensures we only render items with valid images.
    const validMovies = movies.filter(movie => {
        if (isLargeRow) {
            return movie.poster_path; // Large rows (Originals) MUST have a poster
        } else {
            // Standard rows: Accept Backdrop OR Poster (Fixes Documentaries)
            return movie.backdrop_path || movie.poster_path;
        }
    });

    const handleClick = async (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
            return;
        }
        try {
            const type = movie.media_type === 'tv' || movie.first_air_date ? 'tv' : 'movie';
            const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
            const response = await fetch(`https://api.themoviedb.org/3/${type}/${movie.id}/videos?api_key=${API_KEY}&language=en-US`);
            const data = await response.json();
            const trailer = data.results?.find(vid => vid.site === "YouTube" && (vid.type === "Trailer" || vid.type === "Teaser"));
            if (trailer) { setTrailerUrl(trailer.key); setShowError(false); } else { setShowError(true); }
        } catch (e) { setShowError(true); }
    };

    const closePopup = () => { setTrailerUrl(""); setShowError(false); };

    // UPDATED: Tuned to 500ms. 
    // This is the sweet spot: faster than the original (600ms) but retains the "smooth" physics feel.
    const slide = (direction) => {
        if (rowRef.current) {
            const { clientWidth, scrollLeft } = rowRef.current;
            const targetScroll = direction === 'left' 
                ? scrollLeft - clientWidth / 2 
                : scrollLeft + clientWidth / 2;
            
            smoothScroll(rowRef.current, targetScroll, 500); 
        }
    };

    if (validMovies.length === 0) return null;

    return (
        <>
            <div className="pl-4 md:pl-12 my-6 md:my-8 relative z-20 group">
                <h2 className="text-lg md:text-2xl font-bold text-[#e5e5e5] mb-2.5 md:mb-4 hover:text-white cursor-pointer transition w-fit flex items-baseline gap-2">
                    {title}
                    <span className="text-xs md:text-sm text-[#54b9f5] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:inline-block">
                        Explore All ›
                    </span>
                </h2>

                <div className="relative group/slider">
                    <button onClick={() => slide('left')} className="hidden md:flex absolute left-0 top-0 h-full z-[60] w-12 bg-black/50 hover:bg-black/70 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-r text-white cursor-pointer">
                        <ChevronLeft size={40} />
                    </button>

                    <div ref={rowRef} className="flex gap-2 md:gap-4 overflow-x-scroll items-center py-2 pr-12 no-scrollbar transform-gpu">
                        {validMovies.map(movie => {
                            // Smart Path Selection
                            const imagePath = isLargeRow 
                                ? movie.poster_path 
                                : (movie.backdrop_path || movie.poster_path);
                            
                            const isAdded = isInMyList(movie.id);

                            return (
                                <div
                                    key={movie.id}
                                    onClick={() => handleClick(movie)}
                                    // FIXED: Removed 'will-change-transform'. 
                                    // This fixes the bug where images stayed black until hovered.
                                    className={`
                                        relative flex-none 
                                        transition-transform duration-300 ease-out 
                                        cursor-pointer 
                                        hover:scale-105 hover:z-50 
                                        rounded-[4px] overflow-hidden group/item
                                        ${isLargeRow ? "h-[250px] md:h-[320px] w-[160px] md:w-[215px]" : "h-[120px] md:h-[160px] w-[200px] md:w-[280px]"}
                                    `}
                                >
                                    <img
                                        decoding="async"
                                        loading="eager" // Ensures instant painting
                                        className="w-full h-full object-cover"
                                        src={`${isLargeRow ? POSTER_BASE_URL : IMAGE_BASE_URL}${imagePath}`}
                                        alt={movie.title || movie.name}
                                    />
                                    
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 md:opacity-0 md:group-hover/item:opacity-100 flex flex-col justify-end p-3 transition-opacity duration-300">
                                        <div className="flex justify-between items-end">
                                            <h3 className="text-white text-xs md:text-sm font-bold drop-shadow-md max-w-[80%]">
                                                {movie.title || movie.name || movie.original_name}
                                            </h3>
                                            <div
                                                onClick={(e) => { e.stopPropagation(); toggleMyList(movie); }}
                                                className="w-8 h-8 rounded-full border-2 border-gray-400 bg-black/50 hover:border-white hover:bg-white/20 flex items-center justify-center transition hover:scale-110"
                                                title={isAdded ? "Remove from List" : "Add to List"}
                                            >
                                                {isAdded ? <Check size={16} /> : <Plus size={16} />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <button onClick={() => slide('right')} className="hidden md:flex absolute right-0 top-0 h-full z-[60] w-12 bg-black/50 hover:bg-black/70 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l text-white cursor-pointer">
                        <ChevronRight size={40} />
                    </button>
                </div>
            </div>

            {trailerUrl && (
                <div className="security-overlay" onClick={closePopup}>
                    <div className="security-modal trailer-mode" onClick={(e) => e.stopPropagation()}>
                        <div className="trailer-header">
                            <span className="text-white font-semibold text-sm">Playing Trailer</span>
                            <button onClick={closePopup} className="p-1.5 bg-[#3a3a3c] rounded-full hover:bg-[#505052] transition cursor-pointer">
                                <X size={16} className="text-white" />
                            </button>
                        </div>
                        <div className="trailer-container">
                            <YouTube
                                videoId={trailerUrl}
                                opts={{ height: '100%', width: '100%', playerVars: { autoplay: 1, playsinline: 0, controls: 1 } }}
                                className="w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            )}
            {showError && (
                 <div className="security-overlay" onClick={closePopup}>
                    <div className="security-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="mx-auto mt-4 mb-4 w-14 h-14 flex items-center justify-center rounded-full bg-red-500/10">
                            <Info className="text-red-500 w-8 h-8" />
                        </div>
                        <h3 className="security-title">Trailer Unavailable</h3>
                        <p className="security-desc">We couldn't find a trailer for this title right now.</p>
                        <button className="security-btn" onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Row;