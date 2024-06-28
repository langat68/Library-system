import { useState, useContext } from 'react'; // Import React hooks
import axios from 'axios'; // Import Axios for HTTP requests
import { Book } from './BookReducer'; // Import Book type
import BookForm from './BookForm'; // Import BookForm component
import { refreshContext } from '../App'; // Import refresh context

interface BookListProps {
  books: Book[]; // Array of books
  dispatch: any; // Dispatch function
}

const BookList = ({ books, dispatch }: BookListProps) => {
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null); // State for book being edited
  const { refresh, setRefresh } = useContext(refreshContext); // Get refresh context

  const handleEdit = (book: Book) => {
    setBookToEdit(book); // Set book to edit
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`https://library-backend-2-0kjy.onrender.com/books/${id}`); // Delete request
      if (response.status === 200) {
        setRefresh(!refresh); // Toggle refresh state
      }
      dispatch({ type: 'DELETE_BOOK', payload: id }); // Update state
    } catch (error) {
      console.error('Failed to delete book', error); // Log error
    }
  };

  return (
    <div className="book-list-container">
      <BookForm dispatch={dispatch} bookToEdit={bookToEdit} setBookToEdit={setBookToEdit} /> {/* Render Form */}
      <h2>Book List</h2>
      <div>
        <table className="book-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publication_year}</td>
                <td>
                  <button onClick={() => handleEdit(book)}>Edit</button> {/* Edit button */}
                  <button onClick={() => handleDelete(book.id)}>Delete</button> {/* Delete button */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookList; // Export component