import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route to create a new book
router.post('/', async (request, response) => {
  try {
    const { title, author, publishYear, RowId, Comments } = request.body;
    if (!title || !author || !publishYear || !RowId || !Comments) {
      return response.status(400).send({ message: "Please fill all the fields" });
    }
    const newBook = {
      title,
      author,
      publishYear,
      RowId,
      Comments,
    };
    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Route to get all books
router.get('/', async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books
    });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Route to get one book by ID
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    if (!book) {
      return response.status(404).send({ message: 'Book not found' });
    }
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Route to update a book
router.put('/:id', async (request, response) => {
  try {
    const { title, author, publishYear, RowId, Comments } = request.body;
    if (!title || !author || !publishYear || !RowId || !Comments) {
      return response.status(400).send({ message: "Please fill all the fields" });
    }
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body, { new: true });
    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }
    return response.status(200).send({ message: 'Book updated successfully', data: result });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Route to delete a book
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }
    return response.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

export default router;
