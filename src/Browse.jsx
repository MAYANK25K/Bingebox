/**
 * @file Browse.jsx
 * @brief The main content browsing interface of the application.
 *
 * This component assembles the primary user-facing view for browsing movies and TV shows.
 * It includes the navigation bar, a hero banner, a "My List" row (if populated),
 * and numerous genre-specific rows.
 */
import React from 'react';
import BrowseNavbar from './components/BrowseNavbar';
import Banner from './Banner';
import Row from './Row';
import requests from './requests';
import { useMyList } from "./context/MyListContext";

const Browse = () => {
  // Access the user's "My List" from the global context.
  const { myList } = useMyList();

  return (
    <div className="bg-[#141414] min-h-screen overflow-hidden">
      <BrowseNavbar />
      <Banner />
      
      {/*
        "My List" Row:
        This row is conditionally rendered only if the user has added items to their list.
        It's a client-side rendered row, populated from the MyListContext.
      */}
      {myList.length > 0 && (
          <Row title="My List" moviesProp={myList} />
      )}

      {/*
        API-Driven Rows:
        These rows fetch data from the TMDB API based on the provided `fetchUrl`.
        The `isLargeRow` prop styles the "Netflix Originals" row with larger poster images.
      */}
      
      {/* Primary Content Rows */}
      <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="New Releases" fetchUrl={requests.fetchUpcoming} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      
      {/* Genre-Specific Rows */}
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Sci-Fi & Fantasy" fetchUrl={requests.fetchSciFi} />
      <Row title="Thriller Movies" fetchUrl={requests.fetchThriller} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Adventure" fetchUrl={requests.fetchAdventure} />
      <Row title="Animation" fetchUrl={requests.fetchAnimation} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Family Movies" fetchUrl={requests.fetchFamily} />
      <Row title="Drama" fetchUrl={requests.fetchDrama} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
      
    </div>
  );
};

export default Browse;
