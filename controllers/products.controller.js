import productsModel from "../models/products.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const result = await productsModel.find();
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
  try {
    const result = await productsModel.find(filter).sort(sort);
    res.send(result);
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
