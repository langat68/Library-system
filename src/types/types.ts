export interface Book {
    id: number;
    title: string;
    author: string;
    year: string;
  }
  
  export type BookAction =
    | { type: 'SET_BOOKS'; payload: Book[] }
    | { type: 'ADD_BOOK'; payload: Book }
    | { type: 'UPDATE_BOOK'; payload: Book }
    | { type: 'DELETE_BOOK'; payload: number };
  