import express, { Request, Response } from "express";
import cors from "cors";
import booksRoutes from "./routes/routes";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/books", booksRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("📚 API Buku!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
