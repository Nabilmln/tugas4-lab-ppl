"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook =
  exports.updateBook =
  exports.addBook =
  exports.getBookByTitle =
  exports.getBookById =
  exports.getAllBooks =
    void 0;
const fileHandler_1 = require("../utils/fileHandler");
// GET semua buku
const getAllBooks = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const books = yield (0, fileHandler_1.readDatabase)();
    res.json({ data: books });
  });
exports.getAllBooks = getAllBooks;
// GET satu buku berdasarkan ID
const getBookById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const books = yield (0, fileHandler_1.readDatabase)();
    const book = books.find((b) => b.id === parseInt(req.params.id));
    if (!book) {
      res.status(404).json({ message: "Buku tidak ditemukan!" });
      return;
    }
    res.json(book);
  });
exports.getBookById = getBookById;
// GET buku berdasarkan nama (pencarian parsial)
const getBookByTitle = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const books = yield (0, fileHandler_1.readDatabase)();
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
  });
exports.getBookByTitle = getBookByTitle;
// POST tambah buku baru
const addBook = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, year, publisher, genre, pages, isbn, status } =
      req.body;
    if (!title || !author || !year) {
      res
        .status(400)
        .json({ message: "Judul, penulis, dan tahun wajib diisi!" });
      return;
    }
    const books = yield (0, fileHandler_1.readDatabase)();
    const newBook = {
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
    yield (0, fileHandler_1.writeDatabase)(books);
    res
      .status(201)
      .json({ message: "Buku berhasil ditambahkan!", book: newBook });
  });
exports.addBook = addBook;
// PUT update buku
const updateBook = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const books = yield (0, fileHandler_1.readDatabase)();
    const index = books.findIndex((b) => b.id === parseInt(id));
    if (index === -1) {
      res.status(404).json({ message: "Buku tidak ditemukan!" });
      return;
    }
    books[index] = Object.assign(Object.assign({}, books[index]), req.body);
    yield (0, fileHandler_1.writeDatabase)(books);
    res.json({ message: "Buku berhasil diperbarui!", book: books[index] });
  });
exports.updateBook = updateBook;
// DELETE hapus buku
const deleteBook = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let books = yield (0, fileHandler_1.readDatabase)();
    books = books.filter((b) => b.id !== parseInt(id));
    yield (0, fileHandler_1.writeDatabase)(books);
    res.json({ message: "Buku berhasil dihapus!" });
  });
exports.deleteBook = deleteBook;
