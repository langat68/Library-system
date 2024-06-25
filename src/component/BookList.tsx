import React from 'react';
import { Book, BookAction } from '../types/types';
import BookItem from './BookItem';

interface BookListProps {
  books: Book[];
  currentPage: number;
  booksPerPage: number;
  dispatch: React.Dispatch<BookAction>;
}

const BookList: React.FC<BookListProps> = ({ books, currentPage, booksPerPage, dispatch }) => {
  const startIndex = (currentPage - 1) * booksPerPage;
  const selectedBooks = books.slice(startIndex, startIndex + booksPerPage);

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Year</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {selectedBooks.map((book) => (
          <BookItem key={book.id} book={book} dispatch={dispatch} />
        ))}
      </tbody>
    </table>
  );
};

export default BookList;
