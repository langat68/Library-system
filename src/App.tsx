// import React from 'react';
import './App.css';
import { useReducer, useEffect, useState, createContext } from 'react';
import axios from 'axios';
import BookList from './components/BookList';
import BookReducer, { initialState } from './components/BookReducer';


// Create a context for refreshing the book list
export const refreshContext = createContext({ refresh: false, setRefresh: (_refresh: boolean) => {} });

const App = () => {
  // Set up state management using useReducer
  const [state, dispatch] = useReducer(BookReducer, initialState);
  // State for triggering refreshes
  const [refresh, setRefresh] = useState<boolean>(false);

  // Fetch books when component mounts or refresh state changes
  useEffect(() => {
    fetchBooks();
  }, [refresh]);

  // Function to fetch books from the API
  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/books');//ht:8000/bookstp://localhost//https://library-28.onrender.com/books
      // Update the state with fetched books
      dispatch({ type: 'SET_BOOKS', payload: response.data });
    } catch (error) {
      console.error('Failed to fetch books', error);
    }
  };

  return (
    <div className="app-container">
      <h1>My Book Collection</h1>
      {/* Provide refresh context to child components */}
      <refreshContext.Provider value={{ refresh, setRefresh }}>
        {/* Render BookList component with books data and dispatch function */}
        <BookList books={state.books} dispatch={dispatch} />
      </refreshContext.Provider>
    </div>
  );
};

export default App;