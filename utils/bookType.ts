export interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
    publisher: string;
    genre: string;
    pages: number;
    isbn: string;
    status: 'Tersedia' | 'Dipinjam';
  }
  