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

export const getDashboardMetrics = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const salesData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo }, // Orders from last 7 days
          status: "delivered", // Only delivered orders
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
            dayOfWeek: { $dayOfWeek: "$createdAt" }, // Get weekday (1=Sunday, 2=Monday, ...)
          },
          totalOrders: { $sum: 1 }, // Count total delivered orders per day
          totalSales: { $sum: "$subtotal" }, // Sum total sales per day
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 }, // Sort by date
      },
    ]);

    res.json({ salesData });
  } catch (error) {
    console.error("Failed to fetch dashboard metrics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
