import { Request, Response } from "express";
import { readDatabase, writeDatabase } from "../utils/fileHandler";
import { Book } from "../utils/bookType";

// GET semua buku
export const getAllBooks = async (
  req: Request,
  res: Response
): Promise<void> => {
  const books: Book[] = await readDatabase();
  res.json({ data: books });
};

// GET satu buku berdasarkan ID
export const getBookById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const books: Book[] = await readDatabase();
  const book = books.find((b) => b.id === parseInt(req.params.id));

  if (!book) {
    res.status(404).json({ message: "Buku tidak ditemukan!" });
    return;
  }

  res.json(book);
};

// GET buku berdasarkan nama (pencarian parsial)
export const getBookByTitle = async (
  req: Request,
  res: Response
): Promise<void> => {
  const books: Book[] = await readDatabase();
  const title = req.params.title.toLowerCase();

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(title)
  );

  if (filteredBooks.length === 0) {
    res
      .status(404)
      .json({
        error: `Buku dengan judul mengandung "${title}" tidak ditemukan.`,
      });
    return;
  }

  res.json({ data: filteredBooks });
};

// POST tambah buku baru
export const addBook = async (req: Request, res: Response): Promise<void> => {
  const { title, author, year, publisher, genre, pages, isbn, status } =
    req.body;

  if (!title || !author || !year) {
    res.status(400).json({ message: "Judul, penulis, dan tahun wajib diisi!" });
    return;
  }

  const books: Book[] = await readDatabase();
  const newBook: Book = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author,
    year: parseInt(year),
    publisher,
    genre,
    pages: parseInt(pages),
    isbn,
    status: status || "Tersedia",
  };

  books.push(newBook);
  await writeDatabase(books);
  res
    .status(201)
    .json({ message: "Buku berhasil ditambahkan!", book: newBook });
};

// PUT update buku
export const updateBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const books: Book[] = await readDatabase();
  const index = books.findIndex((b) => b.id === parseInt(id));

  if (index === -1) {
    res.status(404).json({ message: "Buku tidak ditemukan!" });
    return;
  }

  books[index] = { ...books[index], ...req.body };
  await writeDatabase(books);
  res.json({ message: "Buku berhasil diperbarui!", book: books[index] });
};

// DELETE hapus buku
export const deleteBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  let books: Book[] = await readDatabase();
  books = books.filter((b) => b.id !== parseInt(id));

  await writeDatabase(books);
  res.json({ message: "Buku berhasil dihapus!" });
};
