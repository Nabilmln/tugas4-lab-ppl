import fs from "fs/promises";
import path from "path";
import { Book } from "../utils/bookType";

// Tentukan path ke file database
const FILE_PATH = path.join(__dirname, "../database/db_books.json");

// Membaca data dari database
export const readDatabase = async (): Promise<Book[]> => {
  try {
    const data = await fs.readFile(FILE_PATH, "utf8");
    return JSON.parse(data) as Book[];
  } catch (error) {
    console.error("Gagal membaca database:", error);
    return [];
  }
};

// Menulis data ke database
export const writeDatabase = async (books: Book[]): Promise<void> => {
  try {
    await fs.writeFile(FILE_PATH, JSON.stringify(books, null, 2), "utf8");
    console.log("Database berhasil diperbarui.");
  } catch (error) {
    console.error("Gagal menulis ke database:", error);
  }
};
