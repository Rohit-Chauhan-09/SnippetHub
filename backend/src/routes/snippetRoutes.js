import express from 'express';
import {
  createSnippet,
  getAllSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet,
} from '../controllers/snippetController.js';

const router = express.Router();

// 1. Create
router.post('/', createSnippet);

// 2. Get ALL Snippets
router.get('/', getAllSnippets);

// 3. Get ONE Snippet by ID (The new line)
router.get('/:id', getSnippetById);

// 4. Update
router.put('/:id', updateSnippet);

// 5. Delete
router.delete('/:id', deleteSnippet);

export default router;