import express from "express";
import {
  getAllBooks,
  getBookById,
  getBookByTitle,
  addBook,
  updateBook,
  deleteBook,
} from "../controllers/booksController";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.get("/search/:title", getBookByTitle);
router.post("/", addBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
