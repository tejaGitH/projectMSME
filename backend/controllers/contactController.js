import Contact from '../models/contactModel.js';

// @desc    Create a new contact message
// @route   POST /api/contact
// @access  Public
const createContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const contactMessage = new Contact({
      name,
      email,
      message,
    });

    const createdMessage = await contactMessage.save();
    res.status(201).json(createdMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { createContactMessage };
