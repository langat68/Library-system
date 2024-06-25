import React, { useRef } from 'react';
import { BookAction } from '../types/types';

interface BookFormProps {
  dispatch: React.Dispatch<BookAction>;
}

const BookForm: React.FC<BookFormProps> = ({ dispatch }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (titleRef.current && authorRef.current && yearRef.current) {
      const newBook = {
        id: Date.now(),
        title: titleRef.current.value,
        author: authorRef.current.value,
        year: yearRef.current.value,
      };
      dispatch({ type: 'ADD_BOOK', payload: newBook });
      titleRef.current.value = '';
      authorRef.current.value = '';
      yearRef.current.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={titleRef} type="text" placeholder="Title" required />
      <input ref={authorRef} type="text" placeholder="Author" required />
      <input ref={yearRef} type="text" placeholder="Year" required />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default BookForm;
