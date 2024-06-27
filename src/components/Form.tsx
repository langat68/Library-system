import { useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import { Book } from './BookReducer';
import { refreshContext } from '../App';

// Define props interface for the Form component
interface FormProps {
  dispatch: any;
  bookToEdit?: Book | null;
  setBookToEdit: (value: any) => void;
}

const Form = ({ dispatch, bookToEdit, setBookToEdit }: FormProps) => {
  // Access refresh context
  const { refresh, setRefresh } = useContext(refreshContext);

  // Create refs for form inputs
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  // Effect to populate form when editing a book
  useEffect(() => {
    if (bookToEdit) {
      // Set input values to bookToEdit properties
      if (titleRef.current) titleRef.current.value = bookToEdit.title;
      if (authorRef.current) authorRef.current.value = bookToEdit.author;
      if (yearRef.current) yearRef.current.value = bookToEdit.publication_year;
    }
  }, [bookToEdit]);

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Get values from refs
    const title = titleRef.current?.value;
    const author = authorRef.current?.value;
    const publication_year = Number(yearRef.current?.value);

    if (title && author && publication_year) {
      const newBook = { title, author, publication_year };

      try {
        if (bookToEdit) {
          // Update existing book
          const response = await axios.put(`https://library-backend-2-0kjy.onrender.com/books/${bookToEdit.id}`, newBook);
          dispatch({ type: 'EDIT_BOOK', payload: response.data });
          setBookToEdit(null);
          if (response.status === 200) {
            setRefresh(!refresh);
          }
        } else {
          // Add new book
          const response = await axios.post('https://library-backend-2-0kjy.onrender.com/books', newBook, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.status === 200) {
            setRefresh(!refresh);
          }
          dispatch({ type: 'ADD_BOOK', payload: response.data });
          setBookToEdit(null);
        }
        // Clear form fields
        if (titleRef.current) titleRef.current.value = '';
        if (authorRef.current) authorRef.current.value = '';
        if (yearRef.current) yearRef.current.value = '';
      } catch (error) {
        console.error('Failed to submit book', error);
      }
    }
  };

  // Render form
  return (
    <div className="form-container">
      <h2>{bookToEdit ? 'Edit Book' : 'Add Book'}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" placeholder="Title" ref={titleRef} required />
        <label htmlFor="author">Author:</label>
        <input type="text" id="author" placeholder="Author" ref={authorRef} required />
        <label htmlFor="publication_year">Year:</label>
        <input type="number" id="publication_year" placeholder="Year" ref={yearRef} required />
        <button type="submit">{bookToEdit ? 'Update Book' : 'Add Book'}</button>
      </form>
    </div>
  );
};

export default Form;