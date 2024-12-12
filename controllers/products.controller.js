import productsModel from "../models/products.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const result = await productsModel.find();
    res.send(result);
  } catch (error) {
    console.log(e.message);
  }
};

export const newProducts = async (req, res) => {
  try {
    const result = await productsModel.find().sort({ createdAt: -1 }).limit(10);
    res.send(result);
  } catch (error) {
    console.log(e.message);
  }
};

export const bestSellerProducts = async (req, res) => {
  try {
    const result = await productsModel.find().sort({ sold: -1 }).limit(14);
    res.send(result);
  } catch (error) {
    console.log(e.message);
  }
};

export const getWomensProducts = async (req, res) => {
  try {
    const result = await productsModel.find().limit(10);
    res.send(result);
  } catch (error) {
    console.log(e.message);
  }
};

export const getMensProducts = async (req, res) => {
  try {
    const result = await productsModel.find().limit(10);
    res.send(result);
  } catch (error) {
    console.log(e.message);
  }
};

export const getBackPacks = async (req, res) => {
  try {
    const result = await productsModel
      .find({ category: "Backpacks" })
      .limit(10);
    res.send(result);
  } catch (error) {
    console.log(e.message);
  }
};

export const getProductById = async (req, res) => {
  try {
    const result = await productsModel.findById(req.params.id);
    res.send(result);
  } catch (error) {
    console.log(e.message);
  }
};

export const getProductsByCategory = async (req, res) => {
  const filter = {
    ...(req.query.category && { category: req.query.category }),
    ...(req.query.min &&
      req.query.max && { price: { $gt: req.query.min, $lt: req.query.max } }),
  };
  const sort = {
    ...(req.query.sort === "popularity" && { sold: -1 }),
    ...(req.query.sort === "latest" && { createdAt: -1 }),
    ...(req.query.sort === "priceLowToHigh" && { price: 1 }),
    ...(req.query.sort === "priceHighToLow" && { price: -1 }),
  };
  const currentPage = req.query.currentPage;
  const limitPerPage = req.query.limitPerPage;
  try {
    const result = await productsModel
      .find(filter)
      .skip((currentPage - 1) * limitPerPage)
      .limit(limitPerPage)
      .sort(sort);
    const count = await productsModel.countDocuments(filter);
    res.send({ result, count });
  } catch (error) {
    console.log(e.message);
  }
};

export const getProductsByQuery = async (req, res) => {
  const filter = {
    ...(req.query.search && {
      title: { $regex: req.query.search, $options: "i" },
    }),
  };
  try {
    const result = await productsModel.find(filter);
    return res.status(200).json({ result });
  } catch (error) {
    throw error;
  }
};

export const getLeastProducts = async (req, res) => {
  try {
    const result = await productsModel.find().sort({ sold: 1 }).limit(8);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
