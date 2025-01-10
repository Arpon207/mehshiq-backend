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

export const getOrders = async (req, res) => {
  try {
    const result = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

export const getOrderById = async (req, res) => {
  const id = req.query.id;
  try {
    const result = await Order.findById(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

export const handleUpdateStatus = async (req, res) => {
  const id = req.query.id;
  const status = req.body.status;
  try {
    const result = await Order.findByIdAndUpdate(id, {
      status: status,
    });
    res.status(200).json({ message: "Order status updated" });
  } catch (error) {}
};

export const trackOrder = async (req, res) => {
  const phone = req.query.phone;
  const orderId = req.query.orderId;
  console.log(phone, orderId);
  try {
    const result = await Order.findOne({
      customerPhone: phone,
      orderId: orderId,
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
