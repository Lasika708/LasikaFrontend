import express from 'express';
import {
  getSubscribers,
  getSubscriber,
  subscribeNewsletter,
  unsubscribeNewsletter
} from '../controllers/newsletterController.js';

const router = express.Router();

// Public route for subscribing
router.post('/', subscribeNewsletter);

// Admin routes (can add authentication later)
router.get('/', getSubscribers);
router.get('/:id', getSubscriber);
router.delete('/:id', unsubscribeNewsletter);

export default router;

