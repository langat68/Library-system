// hooks/useBookFilter.ts
import { useMemo } from 'react';
import { Book } from '../types/types';

export const useBookFilter = (books: Book[], searchTerm: string) => {
  return useMemo(() => {
    if (!searchTerm) return books;
    return books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [books, searchTerm]);
};
