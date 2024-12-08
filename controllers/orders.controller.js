import Order from "../models/orders.model.js";

export const createOrder = async (req, res) => {
  try {
    const generateOrderId = () => {
      const datePart = new Date().getTime().toString().slice(-4); // Last 4 digits of the timestamp
      const randomPart = Math.floor(10 + Math.random() * 90); // Random 2 digits
      return `${datePart}${randomPart}`; // Combine to make 6 digits
    };
    const orderDetails = req.body;
    const newOrderDetails = { ...orderDetails, orderId: generateOrderId() };
    const orderBody = new Order(newOrderDetails);
    const result = await orderBody.save();
    res.status(201).json({ result });
  } catch (error) {
    console.log(error);
  }
};
