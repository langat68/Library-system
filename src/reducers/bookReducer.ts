import { Book, BookAction } from '../types/types';

export const bookReducer = (state: Book[], action: BookAction): Book[] => {
  switch (action.type) {
    case 'SET_BOOKS':
      return action.payload;
    case 'ADD_BOOK':
      return [...state, action.payload];
    case 'UPDATE_BOOK':
      return state.map((book) =>
        book.id === action.payload.id ? action.payload : book
      );
    case 'DELETE_BOOK':
      return state.filter((book) => book.id !== action.payload);
    default:
      return state;
  }
};
