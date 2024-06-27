export interface Book {
  id: number;
  title: string;
  author: string;
  publication_year: string;
}

export interface State {
  books: Book[]; // Array of Book objects
}

type Action =
  | { type: 'ADD_BOOK'; payload: Book }
  | { type: 'DELETE_BOOK'; payload: number }
  | { type: 'EDIT_BOOK'; payload: Book }
  | { type: 'SET_BOOKS'; payload: Book[] };

const BookReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_BOOK':
      return {
        ...state,
        books: [...state.books, action.payload], // Add new book to array
      };
    case 'DELETE_BOOK':
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload), // Remove book by id
      };
    case 'EDIT_BOOK':
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id
            ? { ...book, ...action.payload } // Update book properties
            : book
        ),
      };
    case 'SET_BOOKS':
      return {
        ...state,
        books: action.payload, // Replace entire books array
      };
    default:
      return state;
  }
};

export default BookReducer;

export const initialState = {
  books: [], // Initial empty array of books
};