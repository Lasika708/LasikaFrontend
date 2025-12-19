import Newsletter from '../models/Newsletter.js';

// Get all newsletter subscribers
export const getSubscribers = async (req, res, next) => {
  try {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: subscribers
    });
  } catch (error) {
    next(error);
  }
};

// Get single subscriber
export const getSubscriber = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subscriber = await Newsletter.findById(id);
    
    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber not found'
      });
    }

    res.json({
      success: true,
      data: subscriber
    });
  } catch (error) {
    next(error);
  }
};

// Subscribe to newsletter
export const subscribeNewsletter = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email: email.toLowerCase() });
    if (existingSubscriber) {
      return res.status(400).json({
        success: false,
        message: 'This email is already subscribed'
      });
    }

    const subscriber = new Newsletter({
      email: email.toLowerCase()
    });

    await subscriber.save();

    res.status(201).json({
      success: true,
      data: subscriber,
      message: 'Thank you for subscribing to our newsletter!'
    });
  } catch (error) {
    // Handle duplicate key error (unique constraint)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'This email is already subscribed'
      });
    }
    next(error);
  }
};

// Unsubscribe from newsletter
export const unsubscribeNewsletter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subscriber = await Newsletter.findById(id);

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber not found'
      });
    }

    await Newsletter.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });
  } catch (error) {
    next(error);
  }
};

