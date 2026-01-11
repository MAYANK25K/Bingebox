import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, X, Info } from 'lucide-react';
import YouTube from 'react-youtube';
import requests from '../requests'; 

const TrendingNow = () => {
  const sliderRef = useRef(null);
  const [movies, setMovies] = useState([]);
  
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    async function fetchData() {
        try {
            const response = await fetch(requests.fetchTrending);
            const data = await response.json();
            setMovies(data.results.slice(0, 10)); 
        } catch (error) {
            console.error("Error fetching trending:", error);
        }
    }
    fetchData();
  }, []);

  const handleClick = async (movie) => {
    if (trailerUrl) {
        setTrailerUrl("");
        return;
    }

    try {
        const type = movie.media_type === 'tv' ? 'tv' : 'movie';
        const API_KEY = import.meta.env.VITE_TMDB_API_KEY; 

        const response = await fetch(
            `https://api.themoviedb.org/3/${type}/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
        );
        const data = await response.json();
        
        const trailer = data.results?.find(
            (vid) => vid.site === "YouTube" && (vid.type === "Trailer" || vid.type === "Teaser")
        );

        if (trailer) {
            setTrailerUrl(trailer.key);
            setShowError(false);
        } else {
            setShowError(true);
        }
    } catch (error) {
        setShowError(true);
    }
  };

  const closePopup = () => {
      setTrailerUrl("");
      setShowError(false);
  };

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -sliderRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: sliderRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <>
    <section className="py-8 bg-black overflow-hidden relative z-10">
      <div className="max-w-[1400px] mx-auto px-4 relative group">
        
        <h2 className="text-xl md:text-2xl font-medium mb-4 text-white">Trending Now</h2>

        <div className="flex gap-4 mb-4">
          <div className="bg-black border border-[#555] px-3 py-1 rounded-[4px] text-white text-sm font-medium flex items-center gap-3 cursor-pointer select-none">
            India <ChevronDown size={16} />
          </div>
          <div className="bg-black border border-[#555] px-3 py-1 rounded-[4px] text-white text-sm font-medium flex items-center gap-3 cursor-pointer select-none">
            Movies <ChevronDown size={16} />
          </div>
        </div>

        <div className="relative">
          <button onClick={slideLeft} className="absolute top-0 bottom-0 -left-4 md:-left-12 w-12 bg-black/50 text-white z-40 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70 cursor-pointer rounded-r">
            <ChevronLeft size={48} />
          </button>

          <div 
            ref={sliderRef}
            className="flex gap-4 md:gap-[40px] overflow-x-scroll scroll-smooth py-6 md:py-[20px] px-2 md:pl-[10px] no-scrollbar items-end"
          >
            {movies.map((movie, index) => (
              <div 
                key={movie.id} 
                onClick={() => handleClick(movie)}
                className="relative min-w-[130px] md:min-w-[180px] h-[190px] md:h-[260px] ml-6 md:ml-[25px] flex-shrink-0 cursor-pointer transition-transform duration-300 hover:scale-105 group/card"
              >
                <span 
                  className="absolute bottom-[-10px] md:bottom-0 -left-6 md:-left-9 text-6xl md:text-[7.5rem] font-black text-black leading-none z-10 select-none"
                  style={{ fontFamily: 'Impact, sans-serif', WebkitTextStroke: "2px #5e5e5e" }}
                >
                  {index + 1}
                </span>

                <img 
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`} 
                  alt={movie.title} 
                  className="w-full h-full rounded-[4px] md:rounded-[8px] object-cover relative z-20 shadow-lg"
                />
              </div>
            ))}
          </div>

          <button onClick={slideRight} className="absolute top-0 bottom-0 -right-4 md:-right-12 w-12 bg-black/50 text-white z-40 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70 cursor-pointer rounded-l">
            <ChevronRight size={48} />
          </button>
        </div>
      </div>
    </section>

    {trailerUrl && (
        <div className="security-overlay" onClick={closePopup}>
            <div className="security-modal trailer-mode" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center p-3 bg-[#1c1c1e] border-b border-white/10">
                     <span className="text-white font-semibold ml-2">Trailer</span>
                     <button onClick={closePopup} className="p-1 bg-[#3a3a3c] rounded-full hover:bg-[#48484a]">
                        <X size={20} className="text-white" />
                     </button>
                </div>
                <div className="w-full aspect-video bg-black">
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
            <div className="security-modal">
                <div className="mx-auto mt-6 mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-red-500/10">
                   <Info className="text-red-500 w-6 h-6" />
                </div>
                <h3 className="security-title">Trailer Unavailable</h3>
                <p className="security-desc">We couldn't find a trailer for this specific title.</p>
                <button className="security-btn text-red-500" onClick={closePopup} style={{ color: '#FF453A' }}>Close</button>
            </div>
        </div>
    )}
    </>
  );
};

export default TrendingNow;