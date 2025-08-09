const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  try {
    const { receiver, message } = req.body;
    const newMsg = await Message.create({
      sender: req.user._id,
      receiver,
      message
    });
    res.status(201).json(newMsg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user._id }
      ]
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
