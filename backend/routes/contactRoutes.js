import express from 'express';
import {
  getContacts,
  getContact,
  createContact,
  deleteContact
} from '../controllers/contactController.js';

const router = express.Router();

// Public route for submitting contact form
router.post('/', createContact);

// Admin routes (can add authentication later)
router.get('/', getContacts);
router.get('/:id', getContact);
router.delete('/:id', deleteContact);

export default router;

