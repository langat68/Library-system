import React, { useState, useReducer, useEffect, useCallback, useRef } from 'react';
import BookForm from './component/BookForm';
import BookList from './component/BookList';
import Pagination from './component/Pagination';
import { useLocalStorage } from './hooks/useLocalStorage';
import { bookReducer } from './reducers/bookReducer';
import { Book } from './types/types';
import { useBookFilter } from './hooks/useBookfilter'; // Import the hook

import './App.css';

const App: React.FC = () => {
  const [books, dispatch] = useReducer(bookReducer, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const booksPerPage = 5;

  const [storedBooks, setStoredBooks] = useLocalStorage<Book[]>('books', []);

  useEffect(() => {
    if (storedBooks.length > 0) {
      dispatch({ type: 'SET_BOOKS', payload: storedBooks });
    }
  }, [storedBooks]);

  useEffect(() => {
    setStoredBooks(books);
  }, [books, setStoredBooks]);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  const filteredBooks = useBookFilter(books, searchTerm);

  return (
    <div className="App">
      <h1>Book Repository</h1>
      <BookForm dispatch={dispatch} />
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <BookList
        books={filteredBooks}
        currentPage={currentPage}
        booksPerPage={booksPerPage}
        dispatch={dispatch}
      />
      <Pagination
        currentPage={currentPage}
        totalBooks={filteredBooks.length}
        booksPerPage={booksPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
