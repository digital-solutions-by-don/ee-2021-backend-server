export const newMessage = (req, res, next) => {
  const message = req.body;
  req.exchangeServices.publishMessageToExchange(message);
  res.status(201).json({ message: 'Message saved' });
};
