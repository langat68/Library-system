import React from 'react';
import { Book, BookAction } from '../types/types';

interface BookItemProps {
  book: Book;
  dispatch: React.Dispatch<BookAction>;
}

const BookItem: React.FC<BookItemProps> = ({ book, dispatch }) => {
  const handleDelete = () => {
    dispatch({ type: 'DELETE_BOOK', payload: book.id });
  };

  return (
    <tr>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.year}</td>
      <td>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
};

export default BookItem;
