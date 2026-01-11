/**
 * @file MyListContext.jsx
 * @brief Provides a context for managing the user's "My List" feature.
 *
 * This context handles the state and logic for the user's personal list of movies and shows.
 * It persists the list to the browser's localStorage to ensure it is saved between sessions.
 * The provider exposes the list itself, a function to check if an item is in the list,
 * and a function to add or remove an item from the list.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a React Context for My List.
const MyListContext = createContext();

/**
 * Custom hook to consume the MyListContext.
 * This makes it easier for components to access the context's values.
 * @returns {object} The context value, containing { myList, isInMyList, toggleMyList }.
 */
export const useMyList = () => useContext(MyListContext);

/**
 * The provider component for the My List context.
 * It manages the state and logic for the user's list.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components that will have access to this context.
 */
export const MyListProvider = ({ children }) => {
  // State to hold the array of movies/shows in the user's list.
  const [myList, setMyList] = useState([]);

  // On initial component mount, load the list from localStorage.
  useEffect(() => {
    try {
        const storedList = localStorage.getItem('bingebox-my-list');
        if (storedList) {
            setMyList(JSON.parse(storedList));
        }
    } catch (error) {
        console.error("Failed to load 'My List' from localStorage:", error);
    }
  }, []);

  // Whenever the `myList` state changes, save the updated list to localStorage.
  useEffect(() => {
    try {
        localStorage.setItem('bingebox-my-list', JSON.stringify(myList));
    } catch (error) {
        console.error("Failed to save 'My List' to localStorage:", error);
    }
  }, [myList]);

  /**
   * Checks if a movie is already in the user's list.
   * @param {number} movieId - The ID of the movie to check.
   * @returns {boolean} True if the movie is in the list, false otherwise.
   */
  const isInMyList = (movieId) => {
    return myList.some(movie => movie.id === movieId);
  };

  /**
   * Adds a movie to the list if it's not already there, or removes it if it is.
   * @param {object} movie - The movie object to add or remove.
   */
  const toggleMyList = (movie) => {
    if (isInMyList(movie.id)) {
      setMyList(prev => prev.filter(m => m.id !== movie.id));
    } else {
      setMyList(prev => [...prev, movie]);
    }
  };

  // The value provided to consuming components.
  const value = React.useMemo(() => ({ myList, isInMyList, toggleMyList }), [myList]);

  return (
    <MyListContext.Provider value={value}>
      {children}
    </MyListContext.Provider>
  );
};
